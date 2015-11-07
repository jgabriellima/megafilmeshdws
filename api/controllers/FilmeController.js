var request = require('request');
var cheerio = require('cheerio');
var url = require('url');
var sys = require('sys');
var Base64 = require('js-base64').Base64;

var urlbase = "http://megafilmeshd.net/";

/**
 * CategoriaController
 *
 * @description :: Server-side logic for managing categorias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    all: function(req, res) {
        var url = req.param("u");
        getFilmesByCategoria(url, function(result) {
            return res.json(result);
        });
    },
    get: function(req, res) {
        var url = req.param("u");
        getFilme(url, function(result) {
            return res.json(result);
        });
    }
};

function getFilmesByCategoria(url, callback) {
    request(Base64.decode(url), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            /*lista de categorias*/
            var objs = [];
            $('ul#category-thumbs li').each(function(index, value) {
                var obj = {};
                obj.nome = $(this).attr('title');
                obj.link = Base64.encode($(this).find('a').attr('href'));
                obj.img = $(this).find('img').attr('src');
                objs.push(obj);
            });
            callback(objs);
        }
    })
}

function getFilme(url, callback) {
    request(Base64.decode(url), function(error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            var conteudo = $('#conteudo-s');
            var obj = {};
            obj.nome = conteudo.find("div#center-video div.btn-ver input").attr('alt');
            obj.src = conteudo.find("div#center-video div.btn-ver input").attr('src');
            obj.urlPlayersOptions = conteudo.find("div#center-video div.btn-ver input").attr('href');
            var url_parts = require('url').parse(obj.urlPlayersOptions, true);
            query = url_parts.query;
            obj.players = [];
            obj.playersUrl = [];
            for (q in query) {
                var str = Base64.decode(query[q]);
                if (str.indexOf("http")) {
                    obj.players.push(str);
                } else {
                    obj.playersUrl.push(str);
                }
            }
            callback(obj);
        }
    });
}
