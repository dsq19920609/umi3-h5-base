import { get } from '../utils/requestUtil';

function getSysConfigProperties(params) {
  return get({
    url: 'api/sys/qryCfgFromProperties',
    params,
  });
}


export {
  getSysConfigProperties,
}
