function reg(elm, n){if(elm != null){return elm[n];}else{return '';}}
function checker(elm, type) {  if (elm != undefined) {    if (type == 'href') {      return elm.href;    }    if (type == 'text') {      return elm.innerText.trim();    }    if (type == 'next') {      return elm;    }  } else {    return '';  }}


var thatsthemArr = [];


function searchByName(link, n) {
  setTimeout(() => {
    var w = window.open('https://thatsthem.com/name/'+link[0]+'-'+link[1]);

    setTimeout(() => {
      var results = w.document.getElementsByClassName('ThatsThem-record');
      for (i = 0; i < results.length; i++) {
        var objCont = {};
        var age = checker(results[i].getElementsByClassName('ThatsThem-record-age')[0].getElementsByClassName('active')[0], 'text');

        var m = results[i].getElementsByClassName('ThatsThem-record-overview')[0];
        var fullname = checker(m.getElementsByTagName('h2')[0], 'text');
        var gender = m.getElementsByClassName('ThatsThem-record-controls')[0].getElementsByTagName('span')[0].getAttribute('data-original-title');
        var address = m.getElementsByClassName('ThatsThem-record-address')[0];
        var fulladdress = checker(address, 'text');
        var addressItms = address.getElementsByTagName('span')[0].getElementsByTagName('span');

        var detailContainer = results[i].getElementsByClassName('ThatsThem-record-details row')[0];

        var col1 = Array.from(detailContainer.getElementsByTagName('dt')).map(itm => {
          return itm.innerText.trim().toLowerCase().replace(/\s+/g, '_').replace(/\W+/g, '');
        });
        var col2 = Array.from(detailContainer.getElementsByTagName('dd')).map(itm => {
          return itm.innerText.trim();
        });

        var professionalInfoArray = col1.map(row => {
          return [row, col2[col1.indexOf(row)]];
        });

        function objFrom2dArray(arr) {
          arr.forEach(row => {
            Object.defineProperty(objCont, row[0], {
              value: row[1],
              writable: true
            });
          });
        }
        objFrom2dArray(professionalInfoArray);

        for (a = 0; a < addressItms.length; a++) {
          Object.defineProperty(objCont, addressItms[a].getAttribute('itemprop'), {
            value: checker(addressItms[a], 'text')
          });
        }
        Object.defineProperties(objCont, {
          fullname: {
            value: fullname,
            writable: true
          },
          gender: {
            value: gender,
            writable: true
          }
        });
        thatsthemArr.push(objCont);
      }
    }, 4500);

    setTimeout(() => {
      w.close();
    }, 5600);

  }, ((n + 1) * 9000));
}

var searchArr = [['jeff', 'welling'],['steven','bonti']];

for(s=0; s<searchArr.length; s++){
	searchByName(searchArr[s],s);
}
