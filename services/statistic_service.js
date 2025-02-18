const Todo = require('../model/todo.model');
const Statistics = require('../model/statictis_schema');
const calculateStatistics = async (userId) => {
    try {
        //tüm görevleri getir
        const tasks = await Todo.find({ userId }).populate('category');
        console.log("bulunan görev sayısı ${tasks.length}");
        // temel istatistikler
        const completedTasks = tasks.filter(task => task.isCompleted).length;
        const totalTasks = tasks.length;
        const pendingTasks = totalTasks - completedTasks;
        const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        
        //kategori bazlı tamamlanma oranları
        const categoryCompletion = new Map();
        const categoryDistribution = new Map();
        //kategori istatiskleirni hesapla
        tasks.forEach(task => {
            const categoryId = task.category ? task.category._id.toString() : 'uncategorized';
            categoryDistribution.set(categoryId, (categoryDistribution.get(categoryId) || 0) + 1);
            if (task.isCompleted) {
                categoryCompletion.set(categoryId, (categoryCompletion.get(categoryId) || 0) + 1);
            }
        });

        for (const [key, value] of categoryCompletion.entries()) {
            const completed = categoryCompletion.get(key) || 0;   
            categoryCompletion.set(key, value > 0 ? (completed / value) * 100 : 0);
            
        }
        //haftalık ilerleme hesapla
        const weeklyProgress = calculateWeeklyProgress(tasks);
        //streak hesapla
        const currentStreak = calculateStreak(tasks);
        //istatistikleri kaydet
        const statistics=await Statistics.findOneAndUpdate({ userId }, {
            completedTasks,
            totalTasks,
            categoryCompletion: Object.fromEntries(categoryCompletion),
            weeklyProgress,
            currentStreak,
            pendingTasks,
            completionRate,
            categoryDistribution: Object.fromEntries(categoryDistribution),
            updatedAt: new Date()
        },
            { new: true, upsert: true });
            console.log('✅ İstatistikler başarıyla hesaplandı ve kaydedildi');

        return statistics;
            
        
    } catch (error) {
        console.error('❌ Hesaplama hatası:', error);

        throw new Error("İstatistikler hesaplanırken bir hata oluştu");
        
    }

};

const calculateWeeklyProgress = (tasks) => {
    const progress = new Array(7).fill(0);
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    for (let i = 0; i< 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        const dayTasks = tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate &&
                taskDate.getFullYear() === day.getFullYear() &&
                taskDate.getMonth() === day.getMonth() &&
                taskDate.getDate() === day.getDate();
            
        });
        if (dayTasks.length > 0) {
            const completed = dayTasks.filter(task => task.isCompleted).length;
            progress[i] = completed / dayTasks.length;
        }
    } return progress;
};
const calculateStreak = (tasks) => {
    let streak = 0;
    const now = new Date();
    let currentDate = now;

    while (true) {
        const dayTasks = tasks.filter(task => {
            const taskDate = task.dueDate;
            return taskDate &&
                taskDate.getFullYear() === currentDate.getFullYear() &&
                taskDate.getMonth() === currentDate.getMonth() &&
                taskDate.getDate() === currentDate.getDate();
        });

        if (dayTasks.length === 0 || !dayTasks.every(task => task.isCompleted)) {
            break;
        }

        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
};
const getStatistics = async (userId) => {
    try {
        return await calculateStatistics(userId);
    } catch (error) {
        throw new Error("İstatistikler getirilirken bir hata oluştu"+error.message);
    }
};

module.exports = {
    calculateStatistics,
    getStatistics
};