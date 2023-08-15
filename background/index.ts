import { Storage } from '@plasmohq/storage';

chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [1001]
});

/**
 * Changes the homepage default sort order.
 */
const storage = new Storage();
storage.get('discuit-sort').then((sort) => {
  console.log(sort);

  /*chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: 1001,
        priority: 1,
        action: {
          type: 'redirect',
          redirect: {
            url: `https://discuit.net/api/posts?sort=${sort || 'hot'}`
          }
        },
        condition: {
          urlFilter: 'https://discuit.net/api/posts?sort=hot',
          resourceTypes: [
            'csp_report',
            'font',
            'image',
            'main_frame',
            'media',
            'object',
            'other',
            'ping',
            'script',
            'stylesheet',
            'sub_frame',
            'webbundle',
            'websocket',
            'webtransport',
            'xmlhttprequest'
          ]
        }
      }
    ],
    removeRuleIds: [1001]
  });*/
});
