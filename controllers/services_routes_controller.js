import Services from "../models/services_model.js";

const addService = (req, res) => {
    const service = new Services(req.body);
    service.save()
        .then(service => res.json(service))
        .catch(err => res.json({ msg: err }))
}

const getServices = (req, res) => {
    Services.find()
        .then(services => res.json(services))
        .catch(err => res.json({ msg: err }))
}

const getOneService = (req, res) => {
    Services.findById(req.params.id)
        .then(service => {
            if (!service) return res.json({ msg: "Servicio no Encontrado" });
            res.json(service);
        })
        .catch(err => res.json({ msg: err }))
}

const updateService = async (req, res) => {
    try {
        const service = await Services.findById(req.params.id);
        if (!service) return res.json({ msg: "Servicio no Encontrado" });

        service.name = req.body.name || service.name;
        service.price = req.body.price || service.price;
        service.description = req.body.description || service.description;
        service.stock = req.body.stock || service.stock;
        await service.save();
        res.json(service);
    } catch (error) {
        res.json({ msg: error });
    }
}

const deleteService = (req, res) => {
    Services.findByIdAndDelete(req.params.id)
        .then(service => {
            if (!service) return res.json({ msg: "Servicio no Encontrado" });
            res.json(service);
        }
        ).catch(err => res.json({ msg: err }))
}

export {
    addService,
    getServices,
    getOneService,
    updateService,
    deleteService
}