
function httpGet()
{
    var theUrl = document.getElementById("linkText").value;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //получаем в результате успешного запроса тело страницы html, парсим его и дальше разбираем на то, что нам нужно
            //находим нужные нам поля по классу элемента, они статичны и на разных продуктах одни и те же
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(xmlhttp.responseText, 'text/html');
            console.log(htmlDoc);
            //Ca_h1

            var oldPriceElement = htmlDoc.getElementsByClassName('_1Hw8N')[0];
            var oldPrice = "";
            if(oldPriceElement != null) {
                oldPrice = htmlDoc.getElementsByClassName('_1Hw8N')[0].textContent;
            }else {
                oldPrice = "Нет информации или товар отсутствует!";
            }

            var discountElement = htmlDoc.getElementsByClassName('_2tBiP')[0];
            var discount = "";
            if(discountElement != null) {
                discount = htmlDoc.getElementsByClassName('_2tBiP')[0].textContent;
            }else {
                discount = "Информация отсутствует или нет скидки на товар!";
            }

            var newPriceElement = htmlDoc.getElementsByClassName('_3NaXx _3kWlK')[0];
            var newPrice = "";
            if(newPriceElement != null) {
                newPrice = htmlDoc.getElementsByClassName('_3NaXx _3kWlK')[0].childNodes[0].childNodes[0].textContent;
            }else {
                newPrice = "Нет информации или товар отсутствует!";
            }

            var nameProductElement = htmlDoc.getElementsByClassName('_1BWd_ _2OAAC undefined')[0];
            var nameProduct = "";
            if(nameProductElement != null) {
                nameProduct = htmlDoc.getElementsByClassName('_1BWd_ _2OAAC undefined')[0].textContent;
            }else {
                nameProduct = "Нет информации о названии товара!";
            }

            var feedbacksCountElement = htmlDoc.getElementsByClassName('_2f75n _2J5l3 _15qW8 cia-cs')[0];
            var feedbacksCount = "";
            if(feedbacksCountElement != null) {
                feedbacksCount = htmlDoc.getElementsByClassName('_2f75n _2J5l3 _15qW8 cia-cs')[0].textContent;
            }else{
                feedbacksCount = "Нет информации об отзывах товара!";
            }

            var ratingElement = htmlDoc.getElementsByClassName('_2v4E8')[0];
            var rating = "";
            if(ratingElement != null) {
                rating = htmlDoc.getElementsByClassName('_2v4E8')[0].textContent;
            }else{
                rating = "Нет информации о рейтинге товара!";
            }

            var buysCountElement = htmlDoc.getElementsByClassName('_2aYNE _2WAk7')[0];
            var buysCount = "";
            if(buysCountElement != null) {
                buysCount = htmlDoc.getElementsByClassName('_2aYNE _2WAk7')[0].textContent;
            }else {
                buysCount = "Нет информации о кол-ве покупок товара!";
            }

            var deliveryElement = htmlDoc.getElementsByClassName('_2EUCN _1vuPp')[0];
            var delivery = "";
            if(deliveryElement != null) {
                delivery = htmlDoc.getElementsByClassName('_2EUCN _1vuPp')[0].textContent;
            } else {
                delivery = "Нет информации о самовывозе!";
            }
            deliveryElement = htmlDoc.getElementsByClassName('_3q9zn')[0];
            if(deliveryElement != null) {
                delivery += "\n" + htmlDoc.getElementsByClassName('_3q9zn')[0].textContent;
            }else {
                delivery += "\nНет информации о доставке со склада!";
            }

            var questionsCountElement = htmlDoc.getElementsByClassName('_2f75n _1SqIf _3HzLQ cia-cs')[0].textContent;
            var questionsCount = "";
            if(questionsCountElement != null) {
                questionsCount = htmlDoc.getElementsByClassName('_2f75n _1SqIf _3HzLQ cia-cs')[0].textContent;
                if(questionsCount.startsWith("Задать")){ // Если получили строку "Задать вопрос", то значит вопросов 0
                    questionsCount = "0 вопросов";
                }
            }else {
                questionsCount = "Нет информации о кол-ве вопросов товара!";
            }


            var aboutArr = htmlDoc.getElementsByClassName('_3l91C');
            if(aboutArr != null) {
                var aboutProduct = "";
                for (var i = 0; i < aboutArr.length; i++) {
                    aboutProduct += aboutArr[i].textContent + "\n";
                }
            }else {
                aboutProduct = "Нет информации о товаре!";
            }
            //формируем запрос на добавление записи в таблицу Продуктов
            var sqlQuery = "\"INSERT INTO Products (nameProduct, oldPrice, discount, newPrice, feedbacksCount, rating, buysCount, delivery, questionsCount, aboutProduct)\n" +
                "VALUES ('"+nameProduct+"', '"+oldPrice+"', '"+discount+"', '"+newPrice+"', '"+feedbacksCount+"', '"+rating+"', '"+buysCount+"', '"+delivery+"', '"+questionsCount+"', '"+aboutProduct+"')\";"
            //отправляем запрос в php-скрипт, который и делает запись в бд
            writeDataToDB(sqlQuery);
            console.log(sqlQuery);
            alert("Данные записаны");
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, true );
    xmlhttp.send();
}

function writeDataToDB(str){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    //делаем запрос в php-скрипт с параметром sql-запроса 'q' ( в php-скрипте как раз таки получаем эту 'q')
    xmlhttp.open("POST", "writeToDatabase.php?q=" + str, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send();
}