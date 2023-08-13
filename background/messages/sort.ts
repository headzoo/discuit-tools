import type { PlasmoMessaging } from '@plasmohq/messaging';
import { Storage } from '@plasmohq/storage';

/**
 * Receives request from contents/feed.ts to change the default home page sort order.
 *
 * @param req
 * @param res
 */
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { sort } = req.body;
  if (sort !== 'hot' && sort !== '') {
    const storage = new Storage();
    await storage.set('discuit-sort', sort);

    /*chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [
        {
          id: 1001,
          priority: 1,
          action: {
            type: 'redirect',
            redirect: {
              url: `https://discuit.net/api/posts?sort=${sort}`
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
  }

  res.send({
    sort
  });
};

export default handler;
