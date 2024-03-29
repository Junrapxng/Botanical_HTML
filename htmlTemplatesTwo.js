const noResultHtmlTwo = `
<!DOCTYPE html>
<html lang="en">

<head>
    <title>สวนพฤษศาสตร์มหวิทยาลัยแม่ฟ้าหลวง</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="shortcut icon" href="/img/logoP.png" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap" rel="stylesheet">
</head>

<style>
    .topnav {
        background-color: #13564B;
    }

    .title {
        font-family: 'Kanit', sans-serif;
        color: whitesmoke;
        margin-top: 1em;
        margin-left: 1em;
    }

    .rows {

        list-style-type: none;
        padding: 0;
    }

    .rows1 {
        font-size: 20px;
        list-style-type: none;

    }

    .fa {
        padding: 20px;
        font-size: 30px;
        width: 50px;
        text-align: center;
        text-decoration: none;
        margin: 5px 2px;
    }

    .fa:hover {
        opacity: 0.7;
    }

    .fa-facebook {

        color: white;
    }

    .fa-home {

        color: white;
    }

    .fa-instagram {

        color: white;
    }

    .fa-globe {
        color: white;
    }


    .rowsfoot {
        font-family: 'Kanit', sans-serif;

        font-size: 12px;
        list-style-type: none;
    }

    .rows1 {
        font-size: 20px;
        padding: 1em;
        list-style-type: none;
    }

    footer {
        margin-top: 4.5em;
        bottom: 0;
        width: 100%;
        height: 6.3em;
        padding-top: 6px;
        background-color: #13564B;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }




    .focus {
        height: auto;
        margin-top: 10em;
        background-image: url(/img/but02.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        justify-content: center;
        align-items: center;
        text-align: center;
        display: flex;
    }

    h1 {
        font-weight: 700;
    }

    .img {
        padding-top: 0em;
    }

    .content {
        padding-bottom: 1em;
        font-family: 'Kanit', sans-serif;
        margin-top: 2em;
        margin-bottom: 2em;
        width: 100%;
        background-color: rgba(38, 37, 37, 0.7);
        border-radius: 20px;
        color: white;
    }


    .insearch {
        text-align: center;
        margin-top: 1em;
        width: 35em;
        height: 2.5em;
        border-radius: 2em;
        border: none;
    }

    .butsearch {
        margin-top: 2em;
        width: 8em;
        height: 2.5em;
        border-radius: 2em;
        color: white;
        font-weight: 800;
        border: 3px solid #ffffff;
        background: linear-gradient(to right, #2f835c, #08350a);
    }

    #butshow01 {
        // margin-bottom:8em;
        margin-top: 1em;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .rows01,
    .rows02 {

        text-align: center;
        font-family: 'Kanit', sans-serif;
        color: #13564B;
        font-size: 20px;
        font-weight: 800;
        list-style-type: none;
        text-shadow:
            2px 2px 2px #ffffff,
            -2px 2px 2px #ffffff,
            -2px -2px 0 #ffffff,
            2px -2px 0 #ffffff;

    }

    .but1 {
        margin-top: 1em;
        text-align: center;
        margin-right: 1em;
        background-image: url(/img/but01.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        width: 20%;
        height: 6em;
        border-radius: 2em;
        border: 4px solid #13564B;

    }

    .but2 {
        margin-top: 1em;
        text-align: center;
        margin-left: 1em;
        background-image: url(/img/but02.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        width: 20%;
        height: 6em;
        border-radius: 2em;
        border: 4px solid #13564B;
    }

    .vertical-line {
        margin-top: 1em;
        border: 3px solid #13564B;
        /* Set the border properties */
        height: 70px;
        /* Set the height of the line */
        transform: rotate(0deg);
        /* Rotate the line to make it vertical */
        transform-origin: 0 0;
        /* Set the rotation origin to the top-left corner */
    }

    .rowsfoot {
        font-family: 'Kanit', sans-serif;

        font-size: 12px;
        list-style-type: none;
    }

    #keyword::placeholder {
        color: #000;

       
    } .alert1 {
            padding: 2px;
            background-color: #f4433666;
            color: white;
          }
          
          .closebtn {
            margin-right: 15px;
            color: white;
            font-weight: bold;
            float: right;
            font-size: 22px;
            line-height: 20px;
            cursor: pointer;
            transition: 0.3s;
          }
          
          .closebtn:hover {
            color: black;
          }
</style>

<body>


    <nav class="navbar navbar-expand-sm navbar-dark topnav fixed-top">
        <div class="container-fluid">
            <img id="logo" style="width: 5%;" src="/img/logoP.png" alt="">
            <div class="title">
                <ul class="rows">
                    <li>สวนพฤกษศาสตร์มหาวิทยาลัยแม่ฟ้าหลวง เฉลิมพระเกียรติ 80 พรรษา มหาราชา</li>
                    <li>Mae Fah Luang University Botanical Garden</li>

                </ul>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav me-auto">

                </ul>
                <ul class="navbar-nav ml-auto ">
                    <li class="nav-item"><a href="/" class="nav-link fa fa-home"></a></li>
                    <li class="nav-item"><a href="https://www.facebook.com/mfubotanicalgarden/" class="nav-link fa fa-facebook"></a></li>
                    <li class="nav-item"><a href="https://www.instagram.com/mfubotanicalgarden/?igshid=YTQwZjQ0NmI0OA%3D%3D&fbclid=IwAR1anPVbT5gPd-lkbHqhSx_l6bVgT5AT8T6OQa0aHtZ9TshmEY5beBipDTM" class="nav-link fa fa-instagram"></a></li>
                    <li class="nav-item"><a href="https://bg.mfu.ac.th/bg-index.html" class="nav-link fa fa-globe"></a></li>
                </ul>
            </div>

        </div>
    </nav>


    <div class="focus">

        <div>
            <div class="img"><img width="15%" src="/img/logoP.png" alt=""></div>
            <div class="content ">

                <div class="top">
                    <div class="topic">
                        <ul class="rows1">
                            <li>
                                <h1>ฐานข้อมูลตัวอย่างพรรณไม้</h1>
                            </li>
                            <li>สวนพฤกษศาสตร์มหาวิทยาลัยแม่ฟ้าหลวง เฉลิมพระเกียรติ 80 พรรษา มหาราชา</li>
                            <li>Mae Fah Luang University Botanical Garden Plant Database</li>
                        </ul>
                    </div>


                </div>

                <div>

                    <div class="inputsearch">
                        <div class="alert1">
                            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                            <strong>ไม่พบข้อมูล!</strong>
                        </div>
                        <form action="/displayTwo" method="post">
                            <div>
                                <input class="insearch" type="text" id="mfluNo" name="mfluNo" placeholder="MFLU No.">
                            </div>
                            <div>
                                <input class="insearch" type="text" id="scientificName" name="scientificName"
                                    placeholder="Scientific name">
                            </div>
                            <div>
                            <input class="insearch" type="text" id="familyName" name="familyName"
                                placeholder="FamilyName">
                        </div>
                            <div>
                                <input class="insearch" type="text" id="localName" name="localName"
                                    placeholder="Local name">
                            </div>
                            <div>
                                <input class="insearch" type="text" id="collector" name="collector"
                                    placeholder="Collector">
                            </div>
                            <button class="butsearch" type="submit">Search</button>
                        </form>

                    </div>
                </div>


            </div>

        </div>


    </div>

    <div id="butshow01">
        <button class="but1">
            <ul class="rows01" onclick="redirectToPath('/search');">
                <li>ฐานข้อมูลพรรณไม้</li>
                <li>Plant Database</li>
            </ul>
        </button>
        <div>
            <div class="vertical-line"></div>
        </div>
        <button class="but2">
            <ul class="rows02" onclick="redirectToPath('/searchTwo');">
                <li>ฐานข้อมูลตัวอย่างพรรณไม้</li>
                <li>Herbarium Database</li>
            </ul>
        </button>
    </div>


    <footer style="font-family: 'Kanit', sans-serif;">
        <div>
            <ul class="rowsfoot" style="word-spacing: 2px; list-style: none;">
                <li>ติดต่อเรา</li>
                <li>สวนพฤกษศาสตร์มหาวิทยาลัยแม่ฟ้าหลวง เฉลิมพระเกียรติ 80 พรรษา มหาราชา 333 ม.1 ต.ท่าสุด อ.เมือง จังหวัด
                    เชียงราย 57100</li>
                <li>โทรศัพท์: 0 5391 6470 <span style="margin-left: 5px;">อีเมล: botanical@mfu.ac.th</span></li>
            </ul>
        </div>


        <div>
            <ul class="rowsfoot" style="word-spacing: 2px; list-style: none;">
                <li>Contact</li>
                <li>Mae Fah Laung University Botanical Garden 333 Moo 1 Thasud Subdistrict, Mueang District, Chiang Rai
                    Province 57100 Thailand</li>
                <li>Tel: 0 5391 6470 <span style="margin-left: 5px;">Email: botanical@mfu.ac.th</span></li>
        </div>
    </footer>

</body>
<script>
    function redirectToPath(path) {
        window.location.href = path;
    }
</script>

</html>`;

const resultHtmlTwo = (data) => {
    let htmlResponse = `
    <title>สวนพฤษศาสตร์มหวิทยาลัยแม่ฟ้าหลวง</title>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="/img/logoP.png" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="shortcut icon" href="/img/logoP.png" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap" rel="stylesheet">
    <style>
    .topnav {
        background-color: #13564B;
    }

    .title {
        font-family: 'Kanit', sans-serif;
        color: whitesmoke;
        margin-top: 1em;
        margin-left: 1em;
    }

    .rows {

        list-style-type: none;
        padding: 0;
    }

    .rows1 {
        font-size: 20px;
        list-style-type: none;
        padding: 0;
    }

    .fa {
        padding: 20px;
        font-size: 30px;
        width: 50px;
        text-align: center;
        text-decoration: none;
        margin: 5px 2px;
    }

    .fa:hover {
        opacity: 0.7;
    }

    .fa-facebook {

        color: white;
    }

    .fa-home {

        color: white;
    }

    .fa-instagram {

        color: white;
    }

    .fa-globe {
        color: white;
    }


    .rowsfoot {
        font-family: 'Kanit', sans-serif;

        font-size: 12px;
        list-style-type: none;
    }
    .rows2{
        list-style-type: none ;
    }

    footer {
        margin-top: 4.5em;
        bottom: 0;
        width: 100%;
        height: 6.3em;
        padding-top: 6px;
        background-color: #13564B;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }



    .focus {
        height: 35em;
        margin-top: 10em;
        background-image: url(/img/but02.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .content {
      font-family: 'Kanit', sans-serif;
      margin-top: 2em;
      margin-bottom: 2em;
      width: 80%;
      background-color: rgba(38, 37, 37, 0.7);
      padding: 20px;
      border-radius: 20px;
      text-align: center;
      color: white;
      align-items: center;
      padding-top: 2em;
      max-height: 500px; /* Set a maximum height for the content */
      overflow-y: auto; /* Enable a vertical scrollbar when the content overflows */
  
      /* For WebKit browsers (Chrome, Safari) */
      scrollbar-width: thin;
      scrollbar-color: #2f835c #08350a; /* Thumb color and Track color */
  }
    .top {
        padding-left: 5em;
        display: flex;
        align-items: center;
    }

    .insearch {
        margin-left: 2em;
        width: 30em;
        height: 2.5em;
        border-radius: 2em;
        border: none;
    }

    .topic {
        border-right: 3px solid #ffffff;
        padding-right: 2em;

    }

    .butsearch {
        width: 8em;
        margin-left: 2em;
        height: 2.5em;
        border-radius: 2em;
        color: white;
        font-weight: 800;
        border: 3px solid #ffffff;
        background: linear-gradient(to right, #2f835c, #08350a);
    }
    table {
        text-align: center;
        color: white;
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    th {
        border-bottom: 1px solid #ddd;
    }
    #butshow01 {
        
        // margin-bottom:8em;
        margin-top: 1em;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .rows01,
    .rows02 {
        padding-left: 0;
        text-align: center;
        font-family: 'Kanit', sans-serif;
        color: #13564B;
        font-size: 20px;
        font-weight: 800;
        list-style-type: none;
        text-shadow:
        2px 2px 22px #ffffff,
        -2px 2px 12px #ffffff,
        2px 2px 0 #ffffff,
        2px -2px 22px #ffffff;
            
    }
    .but1 {
        margin-top: 1em;
        text-align: center;
        margin-right: 1em;
        background-image: url(/img/but01.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        width: 20%;
        height: 6em;
        border-radius: 2em;
        border: 4px solid #13564B;
        
    }
td{
    text-align: center;
}
    .but2 {
        margin-top: 1em;
        text-align: center;
        margin-left: 1em;
        background-image: url(/img/but02.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        width: 20%;
        height: 6em;
        border-radius: 2em;
        border: 4px solid #13564B;
    }
    .vertical-line {
        margin-top: 1em;
        border: 3px solid #13564B; /* Set the border properties */
        height: 70px; /* Set the height of the line */
        transform: rotate(0deg); /* Rotate the line to make it vertical */
        transform-origin: 0 0; /* Set the rotation origin to the top-left corner */
      }
      .rowsfoot {
        font-family: 'Kanit', sans-serif;

        font-size: 12px;
        list-style-type: none;
    }
    tbody tr:hover {
      background-color: rgba(61, 59, 59, 0.515); /* Change the background color on hover */
      cursor: pointer; /* Change cursor to pointer on hover */
    }
    #mainreslt {
      border-radius: 2em;
      background-color: rgb(64, 99, 81);
      width: 18em;
      height: 1.6em;
      font-size: 18px;
      color: #fff;
      margin-top: -0.4em;
      margin-left: -1em;
    }
    th, td {
      padding: 15px; /* Adjust padding as needed */
  }
  
  th:nth-child(1),
  td:nth-child(1) {
      width: 5%; /* No. column width */
  }
  
  th:nth-child(2),
  td:nth-child(2) {
      width: 15%; /* Thai Name column width */
  }
  
  th:nth-child(3),
  td:nth-child(3) {
      width: 20%; /* Other Name column width */
  }
  
  th:nth-child(4),
  td:nth-child(4) {
      width: 30%; /* Scientific Name column width */
  }
  
  th:nth-child(5),
  td:nth-child(5) {
      width: 30%; /* Family Name column width */
  }
  .content::-webkit-scrollbar {
    width: 12px;
  }
  
  .content::-webkit-scrollbar-thumb {
    background-color: #2f835c; /* Thumb color */
    border-radius: 10px;
  }
  
  .content::-webkit-scrollbar-track {
    background-color: #08350a; /* Track color */
    border-radius: 10px;
  }
    
</style>
<script>
        function redirectToDetails(id) {
          // Redirect to the details page with the scientific name as a parameter
          window.location.href = '/detailsTwo.html?id=' + encodeURIComponent(id);
        }


        function redirectToPath(path) {
          window.location.href = path;
      }
      document.addEventListener('DOMContentLoaded', function() {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'ไม่พบผลลัพธ์การค้นหา!',
          confirmButtonColor: '#2f835c', // Match your button color
        });
      });
      </script>;

      
    

   
<body>


    <nav class="navbar navbar-expand-sm navbar-dark topnav fixed-top">
        <div class="container-fluid">
            <img id="logo" style="width: 5%;" src="/img/logoP.png" alt="">
            <div class="title">
                <ul class="rows">
                    <li>สวนพฤกษศาสตร์มหาวิทยาลัยแม่ฟ้าหลวง เฉลิมพระเกียรติ 80 พรรษา มหาราชา</li>
                    <li>Mae Fah Luang University Botanical Garden</li>

                </ul>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav me-auto">

                </ul>
                <ul class="navbar-nav ml-auto ">
                    <li class="nav-item"><a href="/" class="nav-link fa fa-home"></a></li>
                    <li class="nav-item"><a href="https://www.facebook.com/mfubotanicalgarden/" class="nav-link fa fa-facebook"></a></li>
                    <li class="nav-item"><a href="https://www.instagram.com/mfubotanicalgarden/?igshid=YTQwZjQ0NmI0OA%3D%3D&fbclid=IwAR1anPVbT5gPd-lkbHqhSx_l6bVgT5AT8T6OQa0aHtZ9TshmEY5beBipDTM" class="nav-link fa fa-instagram"></a></li>
                    <li class="nav-item"><a href="https://bg.mfu.ac.th/bg-index.html" class="nav-link fa fa-globe"></a></li>
                </ul>
            </div>

        </div>
    </nav>


    <div class="focus">


        <div class="content ">
            <div class="top">
                <div class="topic">
                    <ul class="rows1">
                        <li>ฐานข้อมูลตัวอย่างพรรณไม้</li>
                        <li>Herbarium Database</li>

                    </ul>
                </div>

                <div class="inputsearch">
                    <form action="/displayTwol" method="post" style="display: flex;">
                    <input type="text" class="form-control insearch"id="keyword" name="keyword" placeholder="เติม '/'หน้าตัวอักษรเพื่อค้นหาทั้งหมด" >
                        <button class="butsearch" type="submit">Search</button>
                    </form>
                </div>
            </div>

            <div>
            <caption id="mainreslt">ผลลัพธ์การค้นหา (${data.length} รายการ)</caption>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <ul class="rows2">
                                    <li>ลำดับ</li>
                                    <li>No.</li>
                                </ul>
                            </th>
                            <th>
                                <ul class="rows2">
                                    <li>MFLU No.</li>
                                    <li></li>
                                </ul>
                            </th>
                            <th>
                                <ul class="rows2">
                                    <li>ชื่อวิทยาศาตร์</li>
                                    <li>Scientific Name</li>
                                </ul>
                            </th>
                            <th>
                                <ul class="rows2">
                                    <li>ชื่อวงศ์</li>
                                    <li>Family Name</li>
                                </ul>
                            </th>
                            <th>
                                <ul class="rows2">
                                    <li>ชื่อพื้นเมือง</li>
                                    <li>Local Name</li>
                                </ul>
                            </th>
                            <th>
                            <ul class="rows2">
                                <li>ผู้เก็บตัวอย่าง</li>
                                <li>Collector</li>
                            </ul>
                        </th>
                        
                        </tr>
                    </thead>
                    <tbody>`;

    data.forEach((record, index) => {
        htmlResponse += `<tr onclick="redirectToDetails('${record['_id']}')">
                          <td data-label="ลำดับ">${index + 1}</td>
                          <td data-label="MFLU">${record['MFLU']}</td>
                          <td data-label="ชื่อวิทยาศาสตร์"><i>${record['ScientificName']['I']}</i>${record['ScientificName']['II']}</td>
                          <td data-label="ชื่อวงศ์">${record['FamilyName']}</td>
                          <td data-label="ชื่อพื้นเมือง">${record['LocalName']['TH']}</td>
                          <td data-label="ผู้เก็บตัวอย่าง">${record['Collector']['TH']}</td>
                        </tr>`;
    });

    htmlResponse += `</tbody>
    </table>
</div>


</div>




</div>

<div id="butshow01">
<button class="but1" onclick="redirectToPath('/search');">
<ul class="rows01">
    <li>ฐานข้อมูลพรรณไม้</li>
    <li>Plant Database</li>
</ul>
</button>
<div>
<div class="vertical-line"></div>
</div>
<button class="but2" onclick="redirectToPath('/searchTwo');" id="but002">
<ul class="rows02">
    <li>ฐานข้อมูลตัวอย่างพรรณไม้</li>
    <li>Herbarium Database</li>
</ul>
</button>
</div>


<footer style="font-family: 'Kanit', sans-serif;">
        <div>
            <ul class="rowsfoot" style="word-spacing: 2px; list-style: none;">
                <li>ติดต่อเรา</li>
                <li>สวนพฤกษศาสตร์มหาวิทยาลัยแม่ฟ้าหลวง เฉลิมพระเกียรติ 80 พรรษา มหาราชา 333 ม.1 ต.ท่าสุด อ.เมือง จังหวัด
                    เชียงราย 57100</li>
                <li>โทรศัพท์: 0 5391 6470 <span style="margin-left: 5px;">อีเมล: botanical@mfu.ac.th</span></li>
            </ul>
        </div>


        <div>
            <ul class="rowsfoot" style="word-spacing: 2px; list-style: none;">
                <li>Contact</li>
                <li>Mae Fah Laung University Botanical Garden 333 Moo 1 Thasud Subdistrict, Mueang District, Chiang Rai
                    Province 57100 Thailand</li>
                <li>Tel: 0 5391 6470 <span style="margin-left: 5px;">Email: botanical@mfu.ac.th</span></li>
        </div>
    </footer>

</body>

</html>
    `;

    return htmlResponse;
};



const resultHtmlThree = (data) => {
    let htmlResponse = `
    <title>สวนพฤษศาสตร์มหวิทยาลัยแม่ฟ้าหลวง</title>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="/img/logoP.png" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="shortcut icon" href="/img/logoP.png" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap" rel="stylesheet">
    <style>
    .topnav {
        background-color: #13564B;
    }

    .title {
        font-family: 'Kanit', sans-serif;
        color: whitesmoke;
        margin-top: 1em;
        margin-left: 1em;
    }

    .rows {

        list-style-type: none;
        padding: 0;
    }

    .rows1 {
        font-size: 20px;
        list-style-type: none;
        padding: 0;
    }

    .fa {
        padding: 20px;
        font-size: 30px;
        width: 50px;
        text-align: center;
        text-decoration: none;
        margin: 5px 2px;
    }

    .fa:hover {
        opacity: 0.7;
    }

    .fa-facebook {

        color: white;
    }

    .fa-home {

        color: white;
    }

    .fa-instagram {

        color: white;
    }

    .fa-globe {
        color: white;
    }


    .rowsfoot {
        font-family: 'Kanit', sans-serif;

        font-size: 12px;
        list-style-type: none;
    }
    .rows2{
        list-style-type: none ;
    }

    footer {
        margin-top: 4.5em;
        bottom: 0;
        width: 100%;
        height: 6.3em;
        padding-top: 6px;
        background-color: #13564B;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }




    .focus {
        height: 35em;
        margin-top: 10em;
        background-image: url(/img/but02.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .content {
      font-family: 'Kanit', sans-serif;
      margin-top: 2em;
      margin-bottom: 2em;
      width: 80%;
      background-color: rgba(38, 37, 37, 0.7);
      padding: 20px;
      border-radius: 20px;
      text-align: center;
      color: white;
      align-items: center;
      padding-top: 2em;
      max-height: 500px; /* Set a maximum height for the content */
      overflow-y: auto; /* Enable a vertical scrollbar when the content overflows */
  
      /* For WebKit browsers (Chrome, Safari) */
      scrollbar-width: thin;
      scrollbar-color: #2f835c #08350a; /* Thumb color and Track color */
  }
    .top {
        padding-left: 5em;
        display: flex;
        align-items: center;
    }

    .insearch {
        margin-left: 2em;
        width: 30em;
        height: 2.5em;
        border-radius: 2em;
        border: none;
    }

    .topic {
        border-right: 3px solid #ffffff;
        padding-right: 2em;

    }

    .butsearch {
        margin-left:2em;
        width: 8em;
        height: 2.5em;
        border-radius: 2em;
        color: white;
        font-weight: 800;
        border: 3px solid #ffffff;
        background: linear-gradient(#2f835c, #08350a);
    }
    table {
        text-align: center;
        color: white;
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    th {
        border-bottom: 1px solid #ddd;
    }
    #butshow01 {
        
        // margin-bottom:8em;
        margin-top: 1em;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .rows01,
    .rows02 {
        padding-left: 0;
        text-align: center;
        font-family: 'Kanit', sans-serif;
        color: #13564B;
        font-size: 20px;
        font-weight: 800;
        list-style-type: none;
        text-shadow:
        2px 2px 22px #ffffff,
        -2px 2px 12px #ffffff,
        2px 2px 0 #ffffff,
        2px -2px 22px #ffffff;
            
    }
    .but1 {
        margin-top: 1em;
        text-align: center;
        margin-right: 1em;
        background-image: url(/img/but01.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        width: 20%;
        height: 6em;
        border-radius: 2em;
        border: 4px solid #13564B;
        
    }
td{
    text-align: center;
}
    .but2 {
        margin-top: 1em;
        text-align: center;
        margin-left: 1em;
        background-image: url(/img/but02.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        width: 20%;
        height: 6em;
        border-radius: 2em;
        border: 4px solid #13564B;
    }
    .vertical-line {
        margin-top: 1em;
        border: 3px solid #13564B; /* Set the border properties */
        height: 70px; /* Set the height of the line */
        transform: rotate(0deg); /* Rotate the line to make it vertical */
        transform-origin: 0 0; /* Set the rotation origin to the top-left corner */
      }
      .rowsfoot {
        font-family: 'Kanit', sans-serif;

        font-size: 12px;
        list-style-type: none;
    }
    tbody tr:hover {
      background-color: rgba(61, 59, 59, 0.515); /* Change the background color on hover */
      cursor: pointer; /* Change cursor to pointer on hover */
    }
    #mainreslt {
      border-radius: 2em;
      background-color: rgb(64, 99, 81);
      width: 18em;
      height: 1.6em;
      font-size: 18px;
      color: #fff;
      margin-top: -0.4em;
      margin-left: -1em;
    }
    th, td {
      padding: 15px; /* Adjust padding as needed */
  }
  
  th:nth-child(1),
  td:nth-child(1) {
      width: 5%; /* No. column width */
  }
  
  th:nth-child(2),
  td:nth-child(2) {
      width: 15%; /* Thai Name column width */
  }
  
  th:nth-child(3),
  td:nth-child(3) {
      width: 20%; /* Other Name column width */
  }
  
  th:nth-child(4),
  td:nth-child(4) {
      width: 30%; /* Scientific Name column width */
  }
  
  th:nth-child(5),
  td:nth-child(5) {
      width: 30%; /* Family Name column width */
  }
  .content::-webkit-scrollbar {
    width: 12px;
  }
  
  .content::-webkit-scrollbar-thumb {
    background-color: #2f835c; /* Thumb color */
    border-radius: 10px;
  }
  
  .content::-webkit-scrollbar-track {
    background-color: #08350a; /* Track color */
    border-radius: 10px;
  }

  .alert1 {
    padding: 2px;
    background-color: #f4433666;
    color: white;
  }
  
  .closebtn {
    margin-right: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .closebtn:hover {
    color: black;
  }
    
</style>
<script>
        function redirectToDetails(id) {
          // Redirect to the details page with the scientific name as a parameter
          window.location.href = '/detailsTwo.html?id=' + encodeURIComponent(id);
        }


        function redirectToPath(path) {
          window.location.href = path;
      }
      document.addEventListener('DOMContentLoaded', function() {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'ไม่พบผลลัพธ์การค้นหา!',
          confirmButtonColor: '#2f835c', // Match your button color
        });
      });
      </script>;

      
    

   
<body>


    <nav class="navbar navbar-expand-sm navbar-dark topnav fixed-top">
        <div class="container-fluid">
            <img id="logo" style="width: 5%;" src="/img/logoP.png" alt="">
            <div class="title">
                <ul class="rows">
                    <li>สวนพฤกษศาสตร์มหาวิทยาลัยแม่ฟ้าหลวง เฉลิมพระเกียรติ 80 พรรษา มหาราชา</li>
                    <li>Mae Fah Luang University Botanical Garden</li>

                </ul>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav me-auto">

                </ul>
                <ul class="navbar-nav ml-auto ">
                    <li class="nav-item"><a href="/" class="nav-link fa fa-home"></a></li>
                    <li class="nav-item"><a href="https://www.facebook.com/mfubotanicalgarden/" class="nav-link fa fa-facebook"></a></li>
                    <li class="nav-item"><a href="https://www.instagram.com/mfubotanicalgarden/?igshid=YTQwZjQ0NmI0OA%3D%3D&fbclid=IwAR1anPVbT5gPd-lkbHqhSx_l6bVgT5AT8T6OQa0aHtZ9TshmEY5beBipDTM" class="nav-link fa fa-instagram"></a></li>
                    <li class="nav-item"><a href="https://bg.mfu.ac.th/bg-index.html" class="nav-link fa fa-globe"></a></li>
                </ul>
            </div>

        </div>
    </nav>
   


    <div class="focus">


        <div class="content ">
        <div class="alert1">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
    <strong>ไม่พบข้อมูล!</strong>
  </div>
            <div class="top">
                <div class="topic">
                    <ul class="rows1">
                        <li>ฐานข้อมูลตัวอย่างพรรณไม้</li>
                        <li>Herbarium Database</li>

                    </ul>
                </div>

                <div class="inputsearch">
                    <form action="/displayTwol" method="post" style="display: flex;">
                    <input type="text" class="form-control insearch"id="keyword" name="keyword" placeholder="เติม '/'หน้าตัวอักษรเพื่อค้นหาทั้งหมด" >
                        <button class="butsearch" type="submit">Search</button>
                    </form>
                </div>
            </div>

            <div>
            <caption id="mainreslt">ผลลัพธ์การค้นหา (${data.length} รายการ)</caption>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <ul class="rows2">
                                    <li>ลำดับ</li>
                                    <li>No.</li>
                                </ul>
                            </th>
                            <th>
                                <ul class="rows2">
                                    <li>MFLU No.</li>
                                    <li></li>
                                </ul>
                            </th>
                            <th>
                                <ul class="rows2">
                                    <li>ชื่อวิทยาศาตร์</li>
                                    <li>Scientific Name</li>
                                </ul>
                            </th>
                            <th>
                                <ul class="rows2">
                                    <li>ชื่อวงศ์</li>
                                    <li>Family Name</li>
                                </ul>
                            </th>
                            <th >
                                <ul class="rows2">
                                    <li>ชื่อพื้นเมือง</li>
                                    <li>Local Name</li>
                                </ul>
                            </th>
                            <th>
                            <ul class="rows2">
                                <li>ผู้เก็บตัวอย่าง</li>
                                <li>Collector</li>
                            </ul>
                            </th>
                        </tr>
                    </thead>
                    <tbody>`;

    data.forEach((record, index) => {
        htmlResponse += `<tr onclick="redirectToDetails('${record['_id']}')">
                          <td data-label="ลำดับ">${index + 1}</td>
                          <td data-label="MFLU">${record['MFLU']}</td>
                          <td data-label="ชื่อวิทยาศาสตร์"><i>${record['ScientificName']['I']}</i>${record['ScientificName']['II']}</td>
                          <td data-label="ชื่อวงศ์">${record['FamilyName']}</td>
                          <td data-label="ชื่อพื้นเมือง">${record['LocalName']['TH']}</td>
                          <td data-label="ผู้เก็บตัวอย่าง">${record['Collector']['TH']}</td>
                        </tr>`;
    });

    htmlResponse += `</tbody>
    </table>
</div>


</div>




</div>

<div id="butshow01">
<button class="but1" onclick="redirectToPath('/search');">
<ul class="rows01">
    <li>ฐานข้อมูลพรรณไม้</li>
    <li>Plant Database</li>
</ul>
</button>
<div>
<div class="vertical-line"></div>
</div>
<button class="but2" onclick="redirectToPath('/search-herbarium');" id="but002">
<ul class="rows02">
    <li>ฐานข้อมูลตัวอย่างพรรณไม้</li>
    <li>Herbarium Database</li>
</ul>
</button>
</div>


<footer style="font-family: 'Kanit', sans-serif;">
        <div>
            <ul class="rowsfoot" style="word-spacing: 2px; list-style: none;">
                <li>ติดต่อเรา</li>
                <li>สวนพฤกษศาสตร์มหาวิทยาลัยแม่ฟ้าหลวง เฉลิมพระเกียรติ 80 พรรษา มหาราชา 333 ม.1 ต.ท่าสุด อ.เมือง จังหวัด
                    เชียงราย 57100</li>
                <li>โทรศัพท์: 0 5391 6470 <span style="margin-left: 5px;">อีเมล: botanical@mfu.ac.th</span></li>
            </ul>
        </div>


        <div>
            <ul class="rowsfoot" style="word-spacing: 2px; list-style: none;">
                <li>Contact</li>
                <li>Mae Fah Laung University Botanical Garden 333 Moo 1 Thasud Subdistrict, Mueang District, Chiang Rai
                    Province 57100 Thailand</li>
                <li>Tel: 0 5391 6470 <span style="margin-left: 5px;">Email: botanical@mfu.ac.th</span></li>
        </div>
    </footer>

</body>

</html>
    `;

    return htmlResponse;
};

module.exports = { noResultHtmlTwo, resultHtmlTwo, resultHtmlThree };