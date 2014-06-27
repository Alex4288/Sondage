// Dépendances Du Module.
var application_root = __dirname,
        express = require('express'), //Structure Web.
        path = require('path'), //Utilitaires Pour Traiter Avec Les Chemins De Fichiers.
        mongoose = require('mongoose'); //Intégration De MongoDB.

//Creation Du serveur.
var app = express();

//Connection à La Base De Données.
mongoose.connect('mongodb://localhost/library_database');

//Schémas.
var Keywords = new mongoose.Schema({
    keyword: String
});

var Sondage = new mongoose.Schema({
    title: String,
    body_sondage: String,
    type_sondage: String,
    publish: Boolean
});

var Sondage_Contenu = new mongoose.Schema({
    intitule: String,
    ordre: {type: Number, min: 1, max: 10}
});

var Sondage_Question = new mongoose.Schema({
    sondage_id: String,
    question: String,
    cle_utilisateur: String
});

//Models.
var Sondage_Model = mongoose.model('Sondage', Sondage);
var Sondage_Contenu_Model = mongoose.model('Sondage_Contenu', Sondage_Contenu);
var Sondage_Question_Model = mongoose.model('Sondage_Question', Sondage_Question);

// Configuration Du Serveur.
app.configure(function() {
    //Analyser Le Corps De La Demande Et Remplit Request.Body.
    app.use(express.bodyParser());

    //Côntroler Request.Body Pour Ne Pas Tenir Compte De La Méthode HTTP.
    app.use(express.methodOverride());

    //Effectuer La Recherche De Route Basée Sur l'Url Et La Méthode HTTP.
    app.use(app.router);

    //Où Il Faut Mettre Du Contenu Statique.
    app.use(express.static(path.join(application_root, 'public_html')));

    //Voir Toutes Les Erreurs Dans Le Développement.
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

// Chemin.
app.get('/api', function(request, response) {
    response.send('L`API Bibliothèque Est En Cours D`Execution');
});

//Récupérer Une Liste De Tous Les Sondages.
app.get('/api/sondages', function(request, response) {
    return Sondage_Model.find(function(err, sondage) {
        if (!err) {
            return response.send(sondage);
        } else {
            return console.log(err);
        }
    });
});

//Récupérer Une Liste De Toutes Les Questions (Administrateur).
app.get('/api/sondages/:id/sondage_contenus', function(request, response) {
    return Sondage_Contenu_Model.find(function(err, sondage_Contenu) {
        if (!err) {
            return response.send(sondage_Contenu);
        } else {
            return console.log(err);
        }
    });
});

//Récupérer Une Liste De Toutes Les Questions De Tous Les Sondages.
app.get('/api/sondages_questions', function(request, response) {
    return Sondage_Question_Model.find(function(err, sondage_Contenu) {
        if (!err) {
            return response.send(sondage_Contenu);
        } else {
            return console.log(err);
        }
    });
});

//Récupérer Une Liste De Toutes Les Questions (Utilisateur).
app.get('/api/sondages/:id/sondage_questions', function(request, response) {
    return Sondage_Question_Model.find({sondage_id: request.params.id}, function(err, sondage_Question) {
        if (!err) {
            return response.send(sondage_Question);
        } else {
            return console.log(err);
        }
    });
});

//Récupérer Un Seul Sondage Grâce à l'ID.
app.get('/api/sondages/:id', function(request, response) {
    return Sondage_Model.findById(request.params.id, function(err, sondage) {
        if (!err) {
            return response.send(sondage);
        } else {
            return console.log(err);
        }
    });
});

//Récupérer Une Seule Question Grâce à l'ID (Administrateur).
app.get('/api/sondage_contenus/:id', function(request, response) {
    return Sondage_Contenu_Model.findById(request.params.id, function(err, sondage_Contenu) {
        if (!err) {
            return response.send(sondage_Contenu);
        } else {
            return console.log(err);
        }
    });
});

//Récupérer Une Seule Question Grâce à l'ID (Utilisateur).
app.get('/api/sondage_questions/:id', function(request, response) {
    return Sondage_Question_Model.findById(request.params.id, function(err, sondage_Question) {
        if (!err) {
            return response.send(sondage_Question);
        } else {
            return console.log(err);
        }
    });
});

//Créer Un Nouveau Sondage.
app.post('/api/sondages', function(request, response) {
    console.log(request.body);
    var sondage = new Sondage_Model({
        title: request.body.title,
        body_sondage: request.body.body_sondage,
        type_sondage: request.body.type_sondage,
        publish: request.body.publish
    });
    sondage.save(function(err) {
        if (!err) {
            return console.log('Créé');
            var resultat = {
                title: request.body.title,
                body_sondage: request.body.body_sondage,
                type_sondage: request.body.type_sondage,
                publish: request.body.publish
            };
            return response.send(201, resultat);
        } else {
            return console.log(err);
            return response.send(sondage);
        }
        console.log(sondage);

    });

});

//Créer Une Nouvelle Question (Administrateur).
app.post('/api/sondage_contenus', function(request, response) {
    console.log(request.body);
    var sondage_Contenu = new Sondage_Contenu_Model({
        intitule: request.body.intitule,
        ordre: request.body.ordre
    });
    sondage_Contenu.save(function(err) {
        if (!err) {
            return console.log('Créé');
        } else {
            return console.log(err);
        }
        return response.send(sondage_Contenu);
    });
});

//Créer Une Nouvelle Question (Utilisateur).
app.post('/api/questions', function(request, response) {
//    console.log(request.body);
    var sondage_Question = new Sondage_Question_Model({
        sondage_id: request.body.sondage_id,
        question: request.body.question,
        cle_utilisateur: request.body.cle_utilisateur
    });
    console.log(sondage_Question);
    sondage_Question.save(function(err) {
        if (!err) {
            return console.log('Créé');
        } else {
            return console.log(err);
        }
        console.log(sondage_Question);
        response.setHeader('content-type', 'application/json'); 
        return response.send(201, sondage_Question);
    });
});

//Modifier Un Sondage.
app.put('/api/sondages/:id', function(request, response) {
    console.log('Modification Du Sondage ' + request.body.title);
    return Sondage_Model.findById(request.params.id, function(err, sondage) {
        sondage.title = request.body.title;
        sondage.body_sondage = request.body.body_sondage;
        sondage.type_sondage = request.body.type_sondage;
        sondage.publish = request.body.publish;

        return sondage.save(function(err) {
            if (!err) {
                console.log('Sondage Modifié.');
            } else {
                console.log(err);
            }
            return response.send(sondage);
        });
    });
});

//Modifier Une Question (Administrateur).
app.put('/api/sondage_contenus/:id', function(request, response) {
    console.log('Modification De La Question (Administrateur) ' + request.body.intitule);
    return Sondage_Contenu_Model.findById(request.params.id, function(err, sondage_Contenu) {
        sondage_Contenu.intitule = request.body.intitule;
        sondage_Contenu.ordre = request.body.ordre;

        return sondage_Contenu.save(function(err) {
            if (!err) {
                console.log('Question Modifiée (Administrateur).');
            } else {
                console.log(err);
            }
            return response.send(sondage_Contenu);
        });
    });
});

//Modifier Une Question (Utilisateur).
app.put('/api/questions/:id', function(request, response) {
    console.log('Modification De La Question (Utilisateur) ' + request.body.sondageId);
    return Sondage_Question_Model.findById(request.params.id, function(err, sondage_Question) {
        
        if (err) {
            console.log(err);
        };
        
        sondage_Question.sondage_id = request.body.sondage_id;
        sondage_Question.question = request.body.question;
        sondage_Question.cle_utilisateur = request.body.cle_utilisateur;

        return sondage_Question.save(function(err) {
            if (!err) {
                console.log('Question Modifiée (Utilisateur).');
            } else {
                console.log(err);
            }
            return response.send(sondage_Question);
        });
    });
});

//Supprimer Un Sondage.
app.delete('/api/sondages/:id', function(request, response) {
    console.log('Suppression Du Sondage Grâce À l ID: ' + request.params.id);
    return Sondage_Model.findById(request.params.id, function(err, sondage) {
        return sondage.remove(function(err) {
            if (!err) {
                console.log('Sondage Supprimé.');
                return response.send('');
            } else {
                console.log(err);
            }
        });
    });
});

//Supprimer Une Question (Administrateur).
app.delete('/api/sondage_contenus/:id', function(request, response) {
    console.log('Suppression De La Question (Administrateur) Grâce À l ID: ' + request.params.id);
    return Sondage_Contenu_Model.findById(request.params.id, function(err, sondage_Contenu) {
        return sondage_Contenu.remove(function(err) {
            if (!err) {
                console.log('Question Supprimée (Administrateur).');
                return response.send('');
            } else {
                console.log(err);
            }
        });
    });
});

//Supprimer Une Question (Utilisateur).
app.delete('/api/questions/:id', function(request, response) {
    console.log('Suppression De La Question (Utilisateur) Grâce À l ID: ' + request.params.id);
    return Sondage_Question_Model.findById(request.params.id, function(err, sondage_Question) {
        return sondage_Question.remove(function(err) {
            if (!err) {
                console.log('Question Supprimée (Utilisateur).');
                return response.send('');
            } else {
                console.log(err);
            }
        });
    });
});

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//Démarrage Serveur.
var port = 4711;
app.listen(port, function() {
    console.log('Le Serveur Express Écoute Sur Le Port %d En Mode %s', port, app.settings.env);
});
