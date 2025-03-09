const Todo = require('../model/todo.model');
const Statistics = require('../model/statictis_schema');

const calculateStatistics = async (userId) => { 
    try {
        // kullanıcnın tüm görevlerini mongodb den çekiyoruz  ve kategoiryle birlikte getiriyoruz
        const tasks = await Todo.find({ userId }).populate('category');
        console.log("bulunan görev sayısı ${tasks.length}");
        // istatistikleri hesapla 
        const completedTasks = tasks.filter(task => task.isCompleted).length;// tamamlanan görev sayısını bulduk
        // => arrow function kullandık   bunu yazarsak returne gerek yok 
        // filter metodu hep trule döndürüyor 
        const totalTasks = tasks.length;
        // bugünün tarihini belirle  
        const today = new Date();//bugünün tarihini alıyoruz
        today.setHours(0, 0, 0, 0);// saati sıfırlıyoruz
        // bekleyen görevleri filtereliyoruz 
        const pendingTasks = tasks.filter(task => !task.isCompleted && new Date(task.dueDate) >= today).length;

        // tamamlanma oranı yüzde olarak
        const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        // kategori bazlı istatistikleri hesaplamak için iki ayrı map oluşturuoyrz 
        const categoryCompletion = new Map();// anahtar deger çiftlerini tutuyor 
        const categoryDistribution = new Map();// her kategorirede kaç görev var 
        // her görevi dolaşarak kategorilere göre tamamnlanma oranlarını ve dağılımlarını hesaplıyoruz .
        tasks.forEach(task => {
            const categoryId = task.category ? task.category._id.toString() : 'none';
            
            categoryDistribution.set(categoryId, (categoryDistribution.get(categoryId) || 0) + 1);
            if (task.isCompleted) {
                
                categoryCompletion.set(categoryId, (categoryCompletion.get(categoryId) || 0) + 1);
            }
        });
        // kategori bazlı tamamlanma oranlarını hesapla
        for (const [key, value] of categoryCompletion.entries()) {
            const completed = categoryCompletion.get(key) || 0;
            categoryCompletion.set(key,value >0 ? (completed/value)*100 : 0);
        }
        // haftalık ilerlemeyi hesapla  
        const weeklyProgress = calculateWeeklyProgress(tasks);
        // kulalnıcn kaç gün üst üste görev tamamladıgını hesapla 
        const currentStreak = calculateStreak(tasks);
            
        // hesaplanan istatistikleri MongoDbden güncelle veya yeni bir kayıt oluşturuyoz 
        const statistics = await Statistics.findOneAndUpdate(
            { userId },
            {
                completedTasks,
                totalTasks,
                categoryCompletion: Object.fromEntries(categoryCompletion),
                weeklyProgress,
                currentStreak,
                pendingTasks,
                completionRate,
                categoryDistribution: Object.fromEntries(categoryDistribution),
                updatedAt: new Date(),
            }, {
            new: true,// güncellenen belgenin yeni halni döndürmesini sağlıyor 
            upsert: true,// eğer belge bulunamazsa yeni bir belge oluşturmasını sağlıyor
        }
        );
        console.log(" İstatistikler başarıyla güncellendi:", statistics);
        return statistics;

        
    } catch (error) {
        console.error(" İstatistik hesaplama hatası:", error.message);
        throw new Error("istatistikelr hesaplanırken bir hata oluştu ");
        
    }

};

// haftalık ilerlemeyi hesapla
const calculateWeeklyProgress = (tasks) => {
    const progress = new Array(7).fill(0);
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    console.log("📅 Haftalık ilerleme hesaplanıyor...");

    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        console.log(`📆 Gün: ${day.toISOString().split("T")[0]}`);

        // o güne ait görevleri filterel  
        const dayTasks = tasks.filter(task => {
            const taskDate = new Date(task.dueDate);
            console.log(` Görev Tarihi: ${taskDate.toISOString().split("T")[0]}`);

            return taskDate.getFullYear() === day.getFullYear() &&
                taskDate.getMonth() === day.getMonth() &&
                taskDate.getDate() === day.getDate();
        });
        // o güne ait tamamlanmış görevleri bul
        if (dayTasks.length > 0) {
            const completed = dayTasks.filter(task => task.isCompleted).length;
            progress[i] = completed / dayTasks.length;
        }
        console.log(`Günlük ilerleme [${i}] = ${progress[i]}`);

    }
    console.log(" Haftalık ilerleme tamamlandı:", progress);

    return progress;
};

// üst üste tamamlanan görev sayısını hesapla
const calculateStreak = (tasks) => {
    let streak = 0;
    const now = new Date();
    let currentDate = now;
    while (true) {
        const dayTasks = tasks.filter(task => {
            const taskDate = task.dueDate;
            return taskDate.getFullYear() === currentDate.getFullYear() &&
                taskDate.getMonth() === currentDate.getMonth() &&
                taskDate.getDate() === currentDate.getDate();
        });
        if (dayTasks.length == 0 || !dayTasks.every(task => task.isCompleted)) {
            
            break;
        }
        //streak sayısını artıkr ve bir gün geriye git
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
    }
    return streak;
};
 
const getStatistics = async (userId) => {
    try {
        return await calculateStatistics(userId);
    } catch (error) {
        throw new Error("İstatistikler getirilirken bir hata oluştu: " + error.message);

    }
        
};
//  Bu modülde oluşturduğumuz fonksiyonları dışa aktarıyoruz.
module.exports = {
    calculateStatistics,
    getStatistics
};