using System.Collections.Generic;

namespace SomeApi.Repsoitory
{
    public interface IRepository
    {
        IEnumerable<Product> GetAll();
        void AddProduct(Product product);

        // void addCartProduct(cartProduct products);

        void DeleteProduct(int id);

        Product GetProduct(int id);
        void UpdateProduct(int id, Product product);
    }
}