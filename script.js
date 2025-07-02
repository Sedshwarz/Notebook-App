var kaydet = document.getElementsByClassName("fa fa-check")[0],
    listem = document.getElementsByClassName("fa fa-list")[0],
    yeni = document.getElementById("yeni"),
    yeni2 = document.getElementById("yeni2"),
    baslik = document.getElementById("headline"),
    geri = document.getElementById("geri"),
    yazi = document.getElementById("txt"),
    list = document.getElementById("list"),
    listbox = document.getElementById("listbox"),
    area = document.getElementById("content"),
    head = document.getElementById("head"),
    adet = document.getElementById("adet"),
    dik = document.getElementById("dik");


adet.innerHTML = 'Listede ' + list.childElementCount + ' Not Var'; // ilk açıldığındaki not sayısını gösterme

function enteer(event) {
    if (event.keyCode == 13) {
        sonaOdakla();
    }
} // başlıktayken enter basıldığında yazı kısmına geçme

function odakla() {
    setTimeout(function() {
        yazi.focus();
    }, 0);
} // yazıya focus için hazır fonksiyon

function sonaOdakla() {
    yazi.focus();
    document.execCommand('selectAll', false, null); // contentEditable div oldugu için focus'u başa odaklar, biz sona aldık
    document.getSelection().collapseToEnd();
}

function liKontrol() {
    for (var b = 0; b < list.childElementCount; b++) {
        list.childNodes[b].classList.remove("listede"); // tüm elemanların listede classList'ini temizlemek için kısayol
    }
}

function yaziD(event) {
    if ((event.keyCode == 8) && (yazi.innerText.trim() == "")) {
        yazi.innerText = "";
        odakla();
    }
} // içerik silindiğinde tekrar placeholder göstersin


document.addEventListener("keydown", function() {

    if (yazi.classList.contains("kayitli")) {
        for (var g = 0; g < list.childElementCount; g++) {
            if (list.childNodes[g].classList.contains("listede")) {
                var gunc = list.childNodes[g];
            } // kaydet butonunun renk değişimi olayı
        }
        if ((yazi.getAttribute("name") === gunc.getAttribute("name")) && (baslik.value == gunc.alt)) {
            kaydet.style.color = "#4b4b4b";
        } else {
            kaydet.style.color = "#b33939";
        } // kaydet butonunun renk değişimi olayı
    } else {
        kaydet.style.color = "#b33939";
    }
});


listem.addEventListener("click", function() {
    area.style.opacity = "0";
    head.style.opacity = "0"; // liste butonuna basıldığında listeyi gösterme
    setTimeout(function() {
        area.style.display = "none";
        head.style.display = "none";
        listbox.style.marginTop = "0";
    }, 400);
});


geri.onclick = function() {
    area.style.opacity = "1";
    head.style.opacity = "1"; // geri butonuna basıldığında anasayfaya dönme
    area.style.display = "block";
    head.style.display = "block";
    listbox.style.marginTop = "100%";
}

yeni.onclick = function yeni() {
    area.style.opacity = "1";
    head.style.opacity = "1";
    area.style.display = "block"; // yeni butonuna basıldığında kayit modunu kapatıp yeni sayfa açma
    head.style.display = "block";
    baslik.value = "";
    yazi.innerText = "";
    baslik.focus();
    yazi.classList.remove("kayitli");
    liKontrol();
}

yeni2.onclick = function yeni() {
    area.style.opacity = "1";
    head.style.opacity = "1";
    area.style.display = "block"; // aynısını anasayfadaki buton için yaptık
    head.style.display = "block";
    baslik.value = "";
    yazi.innerText = "";
    baslik.focus();
    yazi.classList.remove("kayitli");
    liKontrol();
}




kaydet.onclick = function() {

    if (baslik.value.trim() === "") {
        baslik.value = "";
        baslik.focus();
    } // kaydetme butonunda önce, verilerin boş olmaması kontrolünü yaptık
    else if (yazi.innerText.trim() === "") {
        yazi.innerText = "";
        odakla();
    } else {

        if (yazi.classList.contains("kayitli") == false) {

            var bas = baslik.value;
            var text = yazi.innerText;


            if (yazi.innerText.length > 21) {
                var text = text.substring(0, 18) + "...";
            } // aşması durumunda sona ... getirmek için
            if (baslik.value.length > 20) {
                var bas = bas.substring(0, 17) + "...";
            }


            var endeks = '<span id="bas">' + bas + '</span> <span id="icerik">' + text + '</span> <div id="li-icon"><i style="top:3px;position:relative;font-size: 41px;padding:9px 10px;" title="Düzenle" class="fa fa-edit"></i><i style="position:relative;font-size: 41px;padding-top:9px;" title="Sil" class="fa fa-trash"></i></div>';

            var li = document.createElement("li"); // yeni liste elemanı oluşturup endeks'i de içine gömüp list'e atadık
            li.innerHTML = endeks;
            list.appendChild(li);
            li.title = yazi.innerText;
            li.setAttribute("name", yazi.innerHTML); // sonra veriyi çekmek için buraya atadık
            li.alt = baslik.value;
            li.classList.add("listede"); // ilk kaydettiğimizde kayıtlı olacak ki bir daha kaydet dediğimizde üzerine yazsın


            var trash = document.getElementsByClassName("fa fa-trash");
            for (var j = 0; j < trash.length; j++) {
                trash[j].onclick = function() { // silme olayını verdik her çöp butonu için
                    if (this.parentNode.parentNode.classList.contains("listede")) {
                        yazi.classList.remove("kayitli");
                        kaydet.style.color = "#b33939";
                    }
                    this.parentNode.parentNode.remove();
                    notsayi();
                }
            }


            var edit = document.getElementsByClassName("fa fa-edit");
            for (var k = 0; k < edit.length; k++) {
                edit[k].onclick = function() {

                    liKontrol();                                                     // önce listedeki tüm listede classList'ini sildik
                    this.parentNode.parentNode.classList.add("listede");             // şimdi sadece düzenlenecek elemana ekledik
                    baslik.value = this.parentNode.parentNode.alt;
                    yazi.innerHTML = this.parentNode.parentNode.getAttribute("name"); // düzenleme olayını verdik her edit butonu için
                    area.style.opacity = "1";
                    head.style.opacity = "1";
                    area.style.display = "block";
                    head.style.display = "block";
                    sonaOdakla();
                    yazi.classList.add("kayitli");
                }
            }



            function notsayi() { // hazır fonksiyon oluşturduk, not sayısını ve özelliğini güncellemek için
                if (list.childElementCount >= 4) {
                    document.getElementById("qntt").style.height = "10vh";
                } else {
                    document.getElementById("qntt").style.height = "6vh";
                }
                adet.innerHTML = 'Listede ' + list.childElementCount + ' Not Var';
            }

            notsayi();
            yazi.classList.add("kayitli");
            kaydet.style.color = "#4b4b4b";
        } //if
        else {

            for (var z = 0; z < list.childElementCount; z++) {
                if (list.childNodes[z].classList.contains("listede")) {
                    var eleman = list.childNodes[z];
                    var textGuncel = yazi.innerText;
                    var basGuncel = baslik.value;
                    if (textGuncel.length > 21) {
                        textGuncel = textGuncel.substring(0, 18) + "...";
                    } // aşması durumunda sona ... getirmek için
                    if (basGuncel.length > 20) {
                        basGuncel = basGuncel.substring(0, 17) + "...";
                    }

                    eleman.alt = baslik.value;
                    eleman.title = yazi.innerText;
                    eleman.setAttribute("name", yazi.innerHTML);
                    eleman.childNodes[0].innerHTML = basGuncel; // liste elemanını güncelledik
                    eleman.childNodes[2].innerHTML = textGuncel;
                }
            }
            kaydet.style.color = "#4b4b4b";
        } // else


    } //else
} //kaydet




function degistir(elem) {
    document.execCommand(elem.dataset.attribute, false);
}

var sayi = 0;

function degistirAlign(elm) {
    var dizi = ["justifyCenter", "justifyRight", "justifyFull", "justifyLeft"];
    elm.setAttribute("data-attribute", dizi[sayi]);
    document.execCommand(elm.dataset.attribute, false);
    sayi++;
    if (sayi == 4) {
        sayi = 0;
    }
}

function renk(bu) {
    document.execCommand("foreColor", false, bu.value);
}



new Sortable(list, {
    animation: 200,
    ghostClass: 'hayalisinif',
    dragClass: 'sur'
});
