import Products from "../models/products_model.js";

const addProduct = (req, res) => {
    const product = new Products(req.body);
    product.save()
        .then(product => {
            res.json(product);
        }
        ).catch(err => {
            res.json({ msg: err });
        }
        );

}

const getProducts = (req, res) => {
    Products.find().where("doctor").equals(req.doctor)
        .then(products => {
            res.json(products);
        }
        ).catch(error => {
            res.json({ msg: error });
        }
        );
}

const getOneProduct = (req, res) => {
    Products.findById(req.params.id).where("doctor").equals(req.doctor)
        .then(product => {
            res.json(product);
        }
        ).catch(error => {
            res.json({ msg: error });
        }
        );
}

const updateProduct = async (req, res) => {
    const product = await Products.findById(req.params.id);

    if (!product) return res.json({ msg: "Producto no Encontrado" });

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.stock = req.body.stock || product.stock;

    try {
        await product.save();
        res.json(product);
    } catch (error) {
        res.json({ msg: error });
    }
}

const deleteProduct = async (req, res) => {
    Products.findByIdAndDelete(req.params.id)
        .then(product => {
            if (!product) return res.json({ msg: "Producto no Encontrado" });
            res.json(product);
        })
        .catch(error => {
            res.json({ msg: error });
        });
}
export {
    addProduct,
    getProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
}
