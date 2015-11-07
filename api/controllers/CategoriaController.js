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
        var url = req.param("url");
        getFilmesByCategoria(url, function(result) {
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
                obj.link = $(this).find('a').attr('href');
                obj.img = $(this).find('img').attr('src');
                objs.push(obj);
            });
            callback(objs);
        }
    })
} === === === === === === === === === === === === === = categoria === === === === === === === === === === === === === ===


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
    //public
    all: function(req, res) {
        getCategoria(function(result) {
            return res.json(result);
        });
    }
};

function getCategoria(callback) {
    request(urlbase, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            /*lista de categorias*/
            var objs = [];
            $('ul#menu li').each(function(index, value) {
                /*itera cada li*/
                var obj = {};
                obj.nome = $(this).find('span.nome-categoria-red').text();
                obj.acessos = $(this).find("span.numero-post-lancamento").text();
                obj.img = "http://megafilmeshd.net/wp-content/themes/thema-novo/images/bg-" + $(this).attr("id") + ".png";
                obj.link = Base64.encode($(this).find("a").attr('href'));
                objs.push(obj);
                //console.log(obj);
            });
            callback(objs)
        }
    });
}
