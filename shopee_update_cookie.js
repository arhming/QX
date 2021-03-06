function updateSPC_EC() {
  const refreshURL = {
    url: 'https://mall.shopee.tw/api/v4/client/refresh',
    method: "GET", // Optional, default GET.
    headers: {
      Cookie:'shopee_token=' + $prefs.valueForKey('ShopeeToken') + ';'
    }, // Optional.
  };
  $task.fetch(refreshURL).then(response => {
      // response.statusCode, response.headers, response.body
      if (response.statusCode == 200) {
          let cookie = $prefs.setValueForKey(response.headers['Set-Cookie'].split('SPC_EC=')[1].split(';')[0], 'SPC_EC');
          if (cookie) {
            // $notify('蝦皮 Cookie 保存成功🎉', '', '');
            console.log('call updateCookie')
            updateCookie();
          } else {
            $notify('蝦皮 Cookie 保存失敗‼️', '', '請重新登入');
            $done();
          }
      } else {
          $notify('蝦皮 Cookie 保存失敗‼️', '', '請重新登入');
          $done();
      }
  }, reason => {
      // reason.error
      $notify('蝦皮簽到', '', '連線錯誤‼️');
      $done();
  });
}

function updateCookie() {
  const accountInfoURL = {
      url: 'https://shopee.tw/api/v2/user/account_info?from_wallet=false&skip_address=1&need_cart=1',
      method: 'GET', // Optional, default GET.
      headers: {
        Cookie:
          $prefs.valueForKey('CookieSP') + ';SPC_EC=' + $prefs.valueForKey('SPC_EC') +';',
          'X-CSRFToken': $prefs.valueForKey('CSRFTokenSP'),
      }, // Optional.
  };

  $task.fetch(accountInfoURL).then(response => {
      // response.statusCode, response.headers, response.body
      if (response.statusCode == 200) {
        let cookie = $prefs.setValueForKey(
          response.headers['Set-Cookie'],
          'CookieSP'
        );
        if (cookie) {
          console.log('updateCookie')
          $notify('蝦皮 Cookie 保存成功🎉', '', '');
        } else {
          $notify('蝦皮 Cookie 保存失敗‼️', '', '請重新登入');
        }
        $done();
      } else {
        $notify('蝦皮 Cookie 保存失敗‼️', '', '請重新登入');
      }
      $done();
  }, reason => {
      // reason.error
      $notify('蝦皮簽到', reason.error, '連線錯誤‼️');
      $done();
  });
}

updateSPC_EC();

