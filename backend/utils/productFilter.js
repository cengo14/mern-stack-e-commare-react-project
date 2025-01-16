class ProductFilter {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i',
                },
            }
            : {}; // Eğer keyword yoksa boş obje dön
        console.log("Search query:", keyword);

        this.query = this.query.find({ ...keyword });
        console.log("Final Mongo Query:", this.query.getQuery());

        return this;



    }

    filter() {
        const queryCopy = { ...this.queryStr };

        // Kullanılmayan parametreleri kaldır
        const deleteArea = ['keyword', 'limit', 'page'];
        deleteArea.forEach((el) => delete queryCopy[el]);

        // Filtreleme işlemini JSON string olarak dönüştür
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        // Eğer filtreleme yapılacak bir şey yoksa tüm ürünleri döndür
        const filters = JSON.parse(queryStr);
        if (Object.keys(filters).length > 0) {
            this.query = this.query.find(filters);
        }
        return this;
    }
}

module.exports = ProductFilter;
