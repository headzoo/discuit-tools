// ==UserScript==
// @name         Discuit Community Filter
// @namespace    http://discuit.net/
// @version      0.1
// @description  Exclude communities from your feeds on Discuit.
// @author       You
// @match        https://discuit.net/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://raw.githubusercontent.com/soufianesakhi/node-creation-observer-js/master/release/node-creation-observer-latest.js
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// ==/UserScript==

(async function () {
  'use strict';

  /**
   * Starts everything.
   */
  const init = () => {
    // Replace the useless "Posts" label in the feed header with a button to open the filter.
    NodeCreationObserver.onCreation('.select-bar-name', (selectBar) => {
      const filterButton = document.createElement('button');
      filterButton.classList.add('btn', 'btn-default');
      filterButton.textContent = 'Settings';
      filterButton.addEventListener('click', () => {
        gmc.open();
      });
      selectBar.replaceWith(filterButton);
    });

    const hideNSFW = gmc.get('NoNSFW');
    const communities = gmc
      .get('Communities')
      .split(',')
      .map((v) => v.toLowerCase().trim())
      .filter((v) => v);
    const users = gmc
      .get('Users')
      .split(',')
      .map((v) => v.toLowerCase().trim())
      .filter((v) => v);

    NodeCreationObserver.onCreation('.feed-item .community-link', (link) => {
      const item = link.closest('.feed-item');
      const title = item.querySelector('.post-card-heading-title').textContent.toLowerCase();
      const communityName = link.getAttribute('href').slice(1).toLowerCase();
      const username = item
        .querySelector('.post-card-heading-by a')
        .textContent.replace(/[\s@]+/g, '')
        .toLowerCase();

      if (communities.includes(communityName) || users.includes(username) || (hideNSFW && title.includes('[nsfw]'))) {
        item.style.display = 'none';
      }
    });
  };

  const gmc = new GM_config({
    id: 'DiscuitFilter',
    title: 'Discuit Filter',
    fields: {
      Communities: {
        label: 'Comma separated list of communities to filter out of your feed.',
        type: 'text',
        default: 'news, funny'
      },
      Users: {
        label: 'Comma separated list of users to filter out of your feed.',
        type: 'text',
        default: ''
      },
      NoNSFW: {
        label: 'Hide NSFW posts.',
        type: 'checkbox',
        default: false
      }
    },
    css: `
      #DiscuitFilter {
        font-size: 16px;
        padding: 0.5rem;
      }

      #DiscuitFilter_header {
        display: none !important;
      }

      #DiscuitFilter .field_label {
        display: block;
        margin-bottom: 10px;
        font-size: 16px;
      }

      #DiscuitFilter_wrapper input {
        padding: 6px 12px;
        border-radius: 5px;
        font-size: 16px;
        width: 100%;
      }

      #DiscuitFilter_buttons_holder {
        text-align: left;
      }

      #DiscuitFilter_Communities_var,
      #DiscuitFilter_Users_var {
        margin-bottom: 1rem !important;
      }

      #DiscuitFilter_NoNSFW_var {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }

      #DiscuitFilter_field_NoNSFW {
        width: auto !important;
      }

      #DiscuitFilter_buttons_holder {
        display: flex;
      }

      #DiscuitFilter .reset_holder {
        display: none !important;
      }

      #DiscuitFilter .saveclose_buttons {
        color: #ffffff;
        background-color: #646464;
        border: none;
        padding: 6px 12px;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        text-decoration: none;
        transition: all 0ms;
      }

      @media (prefers-color-scheme: dark) {
        #DiscuitFilter {
          color: #fff;
          background: #3c3c3c;
        }

        #DiscuitFilter .reset {
          color: #fff !important;
        }
      }
    `,
    frameStyle: `
      inset: 78px auto auto 236px;
      border: 1px solid rgb(0, 0, 0);
      height: 340px;
      width: 400px;
      margin: 0px;
      max-height: 95%;
      max-width: 95%;
      opacity: 1;
      overflow: auto;
      padding: 0px;
      position: fixed;
      z-index: 9999;
      display: block;
      border-radius: 0.5rem;
    `,
    events: {
      init,
      save: function () {
        this.close();
        location.reload();
      }
    }
  });
})();
