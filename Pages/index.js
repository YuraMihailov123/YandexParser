
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
            var oldPrice = htmlDoc.getElementsByClassName('_1Hw8N')[0].textContent;
            var discount = htmlDoc.getElementsByClassName('_2tBiP')[0].textContent;
            var newPrice = htmlDoc.getElementsByClassName('_3NaXx _3kWlK')[0].childNodes[0].childNodes[0].textContent;
            var nameProduct = htmlDoc.getElementsByClassName('_1BWd_ _2OAAC undefined')[0].textContent;
            var feedbacksCount = htmlDoc.getElementsByClassName('_2f75n _2J5l3 _15qW8 cia-cs')[0].textContent;
            var rating = htmlDoc.getElementsByClassName('_2v4E8')[0].textContent;
            var buysCount = htmlDoc.getElementsByClassName('_2aYNE _2WAk7')[0].textContent;
            var delivery = htmlDoc.getElementsByClassName('_2EUCN _1vuPp')[0].textContent;
            delivery += "\n" + htmlDoc.getElementsByClassName('_3q9zn')[0].textContent;
            var questionsCount = htmlDoc.getElementsByClassName('_2f75n _1SqIf _3HzLQ cia-cs')[0].textContent;
            if(questionsCount.startsWith("Задать")){ // Если получили строку "Задать вопрос", то значит вопросов 0
                questionsCount = "0 вопросов";
            }
            var aboutArr = htmlDoc.getElementsByClassName('_3l91C');
            var aboutProduct = "";
            for (var i=0;i<aboutArr.length;i++)
            {
                aboutProduct += aboutArr[i].textContent + "\n";
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
    xmlhttp.send();
}