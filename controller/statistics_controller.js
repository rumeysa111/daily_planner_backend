const statisticsService = require('../services/statistic_service');
const getStatisticsController = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log(" İstatistikler hesaplanıyor - UserId:", userId);

        if (!userId) {
            throw new Error('Kullanıcı ID bulunamadı');
        }

        const statistics = await statisticsService.getStatistics(userId);
        
        if (!statistics) {
            return res.status(404).json({ 
                message: "İstatistik bulunamadı",
                data: null 
            });
        }

        console.log(" İstatistikler başarıyla hesaplandı");
        res.json({
            success: true,
            data: statistics
        });

    } catch (error) {
        console.error(" İstatistik hatası:", error.message);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};
module.exports = { getStatisticsController }; 