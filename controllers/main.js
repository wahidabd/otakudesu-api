const cheerio = require('cheerio')
const url = require('../helpers/base-url')
const {default: Axios} = require('axios')
const baseUrl = url.baseUrl
const completeAnime = url.completeAnime
const onGoingAnime = url.onGoingAnime
const error = require('../helpers/error')
const imageList = require('../helpers/image_genre')
const express = require('express')

exports.home = (req, res) => {
    let home = {};
    let on_going = [];
    let complete = [];
    Axios.get(baseUrl)
      .then((response) => {
        const $ = cheerio.load(response.data);
        const element = $(".venz");
        let episode, uploaded_on, day_updated, thumb, title, link, id;
        element
          .children()
          .eq(0)
          .find("ul > li")
          .each(function () {
            $(this)
              .find(".thumb > a")
              .filter(function () {
                title = $(this).find(".thumbz > h2").text();
                thumb = $(this).find(".thumbz > img").attr("src");
                link = $(this).attr("href");
                id = link.replace(`${baseUrl}anime/`, "");
              });
            uploaded_on = $(this).find(".newnime").text();
            episode = $(this).find(".epz").text().replace(" ", "");
            day_updated = $(this).find(".epztipe").text().replace(" ", "");
            on_going.push({
              title,
              id,
              thumb,
              episode,
              uploaded_on,
              day_updated,
              link,
            });
          });
        home.on_going = on_going;
        return response;
      })
      .then((response) => {
        const $ = cheerio.load(response.data);
        const element = $(".venz");
        let episode, uploaded_on, score, thumb, title, link, id;
        element
          .children()
          .eq(1)
          .find("ul > li")
          .each(function () {
            $(this)
              .find(".thumb > a")
              .filter(function () {
                title = $(this).find(".thumbz > h2").text();
                thumb = $(this).find(".thumbz > img").attr("src");
                link = $(this).attr("href");
                id = link.replace(`${baseUrl}anime/`, "");
              });
            uploaded_on = $(this).find(".newnime").text();
            episode = $(this).find(".epz").text().replace(" ", "");
            score = parseFloat($(this).find(".epztipe").text().replace(" ", ""));
            complete.push({
              title,
              id,
              thumb,
              episode,
              uploaded_on,
              score,
              link,
            });
          });
        home.complete = complete;
        res.status(200).json({
          status: "success",
          baseUrl: baseUrl,
          home,
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };