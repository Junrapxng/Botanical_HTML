const noResultHtmluptwo = (data) => {
    let htmlResponse = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Colorlib Templates">
    <meta name="author" content="Colorlib">
    <meta name="keywords" content="Colorlib Templates">
    <!-- <script src="admin_page1.js"></script> -->

    <!-- Title Page-->
    <title> สวนพฤษศาสตร์มหวิทยาลัยแม่ฟ้าหลวง</title>
    <link rel="shortcut icon" href="/img/logoP.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap" rel="stylesheet">

    <!-- Icons font CSS-->
    <link href="vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all">
    <link href="vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all">
    <!-- Font special for pages-->
    <link
        href="https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Vendor CSS-->

    <link href="vendor/datepicker/daterangepicker.css" rel="stylesheet" media="all">
    <link rel="stylesheet" href="https://cdn.tailwindcss.com/3.0.12">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>



    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>

    <link href="/css/admin_1.css" rel="stylesheet" media="all">
    <link href="/css/upload-update.css" rel="stylesheet" media="all">
    <link href="/css/sidebar.css" rel="stylesheet" media="all">


</head>

<style>
    #imageContainer {
        display: flex;
        align-items: flex-start;


    }

    #addImage {
        width: 250px;
        height: 150px;
        /* Set your desired fixed height */
        overflow-x: auto;
        /* Enable horizontal scrollbar */
        overflow-y: hidden;
        /* Hide vertical scrollbar */
        white-space: nowrap;
        display: flex;
        /* Ensure flex container for flex items */
    }

    #addImage img {
        width: auto;
        max-height: 150px;
        /* Set your desired fixed height */
        border-radius: 3em;
        padding: 1em;
        flex: 0 0 auto;
        /* Prevent images from shrinking */
    }

    #addImage::-webkit-scrollbar {
        height: 8px;
        /* Adjust the width of the scrollbar */
    }

    #addImage::-webkit-scrollbar-thumb {
        background-color: #2f835c;
        /* Thumb color */
        border-radius: 7px;
    }

    #addImage::-webkit-scrollbar-track {
        background-color: #7e817e;
        /* Track color */
        border-radius: 7px;
    }


    table {
        width: 100%;
        border-collapse: collapse;
        text-align: center;
    }

    th,
    td {
        border: none;
        padding: 12px;
        text-align: center;
        vertical-align: top;
    }

    th {
        background-color: #f2f2f2;
    }


    .topnav {
        background-color: #13564B;
    }

    .title {
        font-family: 'Kanit', sans-serif;
        color: whitesmoke;
        align-items: center;
        margin-left: 1em;
        padding-bottom: 0em;
    }

    .rows {
        margin: 0.5em;
        font-family: 'Kanit', sans-serif;
        color: whitesmoke;
        align-items: center;

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

    .fa-backward {

        color: #13564B;
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

    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 10%;
        background-color: #13564B;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }





    .focus {
        height: 35em;
        padding: 5px;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .content {
      font-family: 'Kanit', sans-serif;
      margin-top: 5em;
      margin-bottom: 2em;
      width: 90%;
      height: 250%;
      background-color: rgba(199, 197, 197, 0.7);
      padding: 20px;
      border-radius: 20px;
      text-align: center;
      color: black;
      align-items: center;
      padding-top: 2em;
      max-height: 500px; /* Set a maximum height for the content */
      overflow-y: auto; /* Enable a vertical scrollbar when the content overflows */
  
      /* For WebKit browsers (Chrome, Safari) */
      scrollbar-width: thin;
      scrollbar-color:#4c4c4c #feffff; /* Thumb color and Track color */
  }
    .top {
        padding-left: 5em;
        display: flex;
        align-items: center;
    }

    .insearch {
        padding-left: 2em;
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
        color: black;
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    th {
        border-bottom: 1px solid #ddd;
    }
    #butshow01 {
        
        margin-bottom:8em;
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
      margin-top: 1em;
      padding-top: 2em;
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
    background-color:#4c4c4c; /* Thumb color */
    border-radius: 10px;
  }
  
  .content::-webkit-scrollbar-track {
    background-color: #feffff; /* Track color */
    border-radius: 10px;
  }

    .butsearch {
        margin-top: 5px;
        width: 8em;
        height: 2.5em;
        border-radius: 2em;
        color: white;
        font-weight: 800;
        border: 3px solid #ffffff;
        background: linear-gradient(#2f835c, #08350a);
    }

    .butout {
        margin-top: 0.5em;
        margin-right: 2em;
        width: 8em;
        height: 3em;
        border-radius: 1em;
        color: white;
         font-weight: 200;
        font-family: 'Kanit', sans-serif;
        border: 3px solid #ffffff;
        background-color: #08350a;
    }

    .butsearch1 {
        width: 8em;
        height: 2.5em;
        border-radius: 1em;
        color: white;
        font-weight: 800;
        border: 3px solid #ffffff;
        background-color: #2f835c;
    }

    .my-custom-popup-class {
        background-color: white !important;
    }

    li {
        list-style: none;
    }


    .alert1 {
        padding: 2px;
        background-color: #f4433666;
        color: white;
        margin-bottom: 10px;
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
      .sidenav{
        text-decoration: underline #ffffff;
    }
</style>

<body>
    <!-- <nav class="navbar navbar-expand-sm navbar-dark topnav fixed-top">
        <div class="container-fluid">
            
                <ul class="rows">
                    <li style="font-size: 18px;">เพิ่มข้อมูลพรรณไม้</li>
                    <li style="font-size: 14px;">สวนพฤกษศาสตร์มหาวิทยาลัยแม่ฟ้าหลวง เฉลิมพระเกียรติ 80 พรรษา มหาราชา</li>

                </ul>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav me-auto">

                </ul>
                <ul class="navbar-nav ml-auto ">
                    <li class="nav-item"><button class="" onclick="redirectToPath('/');">ออกจากระบบ</button></li>
                </ul>
            </div>

        </div>
    </nav>  -->

    <!-- NAVBAR -->
    <!-- ----------------------------------------------------------- ------------------------------- -->
    <!-- ----------------------------------------------------------- ------------------------------- -->

    <div class="row">

    <div class="col-1 d-flex justify-content-center">
    <div id="mySidenav" class="sidenav">
        <a href="/adminhome"><i class="bi bi-trash"></i>หน้าแรก</a>
        <a href="/admin">บันทึกข้อมูลพรรณไม้</a>
        <a href="/upadmin">แก้ไขข้อมูลพรรณไม้</a>
        <a href="/admintwo">บันทึกข้อมูลตัวอย่างพรรณไม้</a>
        <a href="/upadmintwo">แก้ไขข้อมูลตัวอย่างพรรณไม้</a>
    </div>
</div>
    </div>
    <!--Navbar-->
    <nav class="navbar">

        <button class="navbar-toggler hamburger-button" type="button" data-toggle="collapse" aria-expanded="false"
            aria-label="Toggle navigation" onclick="Nav()" style="z-index: 2">
            <div class="animated-icon"><span></span><span></span><span></span></div>
        </button>

        <button type="button" class="butout" onclick="redirectToPath('/');">ออกจากระบบ</button>
    </nav>

    <center>
       <div>
          <h1 style="margin-top: 1.5em; font-family:'Kanit', sans-serif ;">แก้ไขข้อมูลตัวอย่างพรรณไม้</h1>
      </div>
   </center>

    <div class="focus">

    
        <div class="content ">
        <div class="alert1">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
    <strong>ไม่พบข้อมูล!</strong>
  </div>
            <div class="top">
                <div class="topic">
                    <ul class="rows1">
                        <li>ค้นหาข้อมูลตัวอย่างพรรณไม้</li>
                        <li>Herbarium Database</li>

                    </ul>
                </div>

                <div class="inputsearch">
                    <form action="/displayuptwo" method="post" style="display: flex;">
                    <input type="text" class="form-control insearch"id="keyword" name="keyword" placeholder="ค้นหาข้อมูลตัวอย่างพรรณไม้" >
                        <button class="butsearch" type="submit">Search</button>
                    </form>
                </div>
            </div>

            <div class = "mt-2">
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

                </tr>
            </thead>
            <tbody>`;

    data.forEach((record, index) => {
        htmlResponse += `<tr onclick="redirectToDetails('${record['_id']}')">
                          <td data-label="ลำดับ" >${index + 1}</td>
                          <td data-label="MFLU" >${record['MFLU']}</td>
                          <td data-label="ชื่อวิทยาศาสตร์" ><i>${record['ScientificName']['I']} </i>${record['ScientificName']['II']}</td>
                          <td data-label="ชื่อวงศ์">${record['FamilyName']}</td>
                          <td data-label="ชื่อพื้นเมือง">${record['LocalName']['TH']}</td>
                        </tr>`;
    });

    htmlResponse += `</tbody>
    </table>
</div>
</div>
</div>






















</body>

<script>
function Nav() {
var width = document.getElementById("mySidenav").style.width;
if (width === "0px" || width == "") {
document.getElementById("mySidenav").style.width = "300px";
$('.animated-icon').toggleClass('open');
}
else {
document.getElementById("mySidenav").style.width = "0px";
$('.animated-icon').toggleClass('open');
}
}
function redirectToPath(path) {
window.location.href = path;
}
function redirectToDetails(id) {
    // Redirect to the details page with the scientific name as a parameter
    window.location.href = '/updatetwo?id=' + encodeURIComponent(id);
  }

</script>

</html>`;
    return htmlResponse;
};

const resultHtmlUptwo = (data) => {
    let htmlResponse = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Colorlib Templates">
    <meta name="author" content="Colorlib">
    <meta name="keywords" content="Colorlib Templates">
    <!-- <script src="admin_page1.js"></script> -->

    <!-- Title Page-->
    <title> สวนพฤษศาสตร์มหวิทยาลัยแม่ฟ้าหลวง< </title>
    <link rel="shortcut icon" href="/img/logoP.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap" rel="stylesheet">

    <!-- Icons font CSS-->
    <link href="vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all">
    <link href="vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all">
    <!-- Font special for pages-->
    <link
        href="https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Vendor CSS-->

    <link href="vendor/datepicker/daterangepicker.css" rel="stylesheet" media="all">
    <link rel="stylesheet" href="https://cdn.tailwindcss.com/3.0.12">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>



    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>

    <link href="/css/admin_1.css" rel="stylesheet" media="all">
    <link href="/css/upload-update.css" rel="stylesheet" media="all">
    <link href="/css/sidebar.css" rel="stylesheet" media="all">


</head>

<style>
    #imageContainer {
        display: flex;
        align-items: flex-start;


    }

    #addImage {
        width: 250px;
        height: 150px;
        /* Set your desired fixed height */
        overflow-x: auto;
        /* Enable horizontal scrollbar */
        overflow-y: hidden;
        /* Hide vertical scrollbar */
        white-space: nowrap;
        display: flex;
        /* Ensure flex container for flex items */
    }

    #addImage img {
        width: auto;
        max-height: 150px;
        /* Set your desired fixed height */
        border-radius: 3em;
        padding: 1em;
        flex: 0 0 auto;
        /* Prevent images from shrinking */
    }

    #addImage::-webkit-scrollbar {
        height: 8px;
        /* Adjust the width of the scrollbar */
    }

    #addImage::-webkit-scrollbar-thumb {
        background-color: #2f835c;
        /* Thumb color */
        border-radius: 7px;
    }

    #addImage::-webkit-scrollbar-track {
        background-color: #7e817e;
        /* Track color */
        border-radius: 7px;
    }


    table {
        width: 100%;
        border-collapse: collapse;
        text-align: center;
    }

    th,
    td {
        border: none;
        padding: 12px;
        text-align: center;
        vertical-align: top;
    }

    th {
        background-color: #f2f2f2;
    }


    .topnav {
        background-color: #13564B;
    }

    .title {
        font-family: 'Kanit', sans-serif;
        color: whitesmoke;
        align-items: center;
        margin-left: 1em;
        padding-bottom: 0em;
    }

    .rows {
        margin: 0.5em;
        font-family: 'Kanit', sans-serif;
        color: whitesmoke;
        align-items: center;

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

    .fa-backward {

        color: #13564B;
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

    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 10%;
        background-color: #13564B;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }





    .focus {
        height: 35em;
        padding: 5px;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .content {
      font-family: 'Kanit', sans-serif;
      margin-top: 5em;
      margin-bottom: 2em;
      width: 90%;
      height: 250%;
      background-color: rgba(199, 197, 197, 0.7);
      padding: 20px;
      border-radius: 20px;
      text-align: center;
      color: black;
      align-items: center;
      padding-top: 2em;
      max-height: 500px; /* Set a maximum height for the content */
      overflow-y: auto; /* Enable a vertical scrollbar when the content overflows */
  
      /* For WebKit browsers (Chrome, Safari) */
      scrollbar-width: thin;
      scrollbar-color:#4c4c4c #feffff; /* Thumb color and Track color */
  }
    .top {
        padding-left: 5em;
        display: flex;
        align-items: center;
    }

    .insearch {
        padding-left: 2em;
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
        color: black;
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    th {
        border-bottom: 1px solid #ddd;
    }
    #butshow01 {
        
        margin-bottom:8em;
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
      margin-top: 1em;
      padding-top: 2em;
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
    background-color:#4c4c4c; /* Thumb color */
    border-radius: 10px;
  }
  
  .content::-webkit-scrollbar-track {
    background-color: #feffff; /* Track color */
    border-radius: 10px;
  }

  .butsearch {
    margin-top: 5px;
    width: 8em;
    height: 2.5em;
    border-radius: 2em;
    color: white;
    font-weight: 800;
    border: 3px solid #ffffff;
    background: linear-gradient(#2f835c, #08350a);
}
    .butout {
        margin-top: 0.5em;
        margin-right: 2em;
        width: 8em;
        height: 3em;
        border-radius: 1em;
        color: white;
        font-family: 'Kanit', sans-serif;
        font-weight: 200;
        border: 3px solid #ffffff;
        background-color: #08350a;
    }

    .butsearch1 {
        width: 8em;
        height: 2.5em;
        border-radius: 1em;
        color: white;
        font-weight: 800;
        border: 3px solid #ffffff;
        background-color: #2f835c;
    }

    .my-custom-popup-class {
        background-color: white !important;
    }

    li {
        list-style: none;
    }
    .sidenav{
        text-decoration: underline #ffffff;
    }
</style>

<body>
    <!-- <nav class="navbar navbar-expand-sm navbar-dark topnav fixed-top">
        <div class="container-fluid">
            
                <ul class="rows">
                    <li style="font-size: 18px;">เพิ่มข้อมูลพรรณไม้</li>
                    <li style="font-size: 14px;">สวนพฤกษศาสตร์มหาวิทยาลัยแม่ฟ้าหลวง เฉลิมพระเกียรติ 80 พรรษา มหาราชา</li>

                </ul>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav me-auto">

                </ul>
                <ul class="navbar-nav ml-auto ">
                    <li class="nav-item"><button class="" onclick="redirectToPath('/');">ออกจากระบบ</button></li>
                </ul>
            </div>

        </div>
    </nav>  -->

    <!-- NAVBAR -->
    <!-- ----------------------------------------------------------- ------------------------------- -->
    <!-- ----------------------------------------------------------- ------------------------------- -->

    <div class="row">

    <div class="col-1 d-flex justify-content-center">
    <div id="mySidenav" class="sidenav">
        <a href="/adminhome"><i class="bi bi-trash"></i>หน้าแรก</a>
        <a href="/admin">บันทึกข้อมูลพรรณไม้</a>
        <a href="/upadmin">แก้ไขข้อมูลพรรณไม้</a>
        <a href="/admintwo">บันทึกข้อมูลตัวอย่างพรรณไม้</a>  
        <a href="/upadmintwo">แก้ไขข้อมูลตัวอย่างพรรณไม้</a>
    </div>
</div>
    </div>
    <!--Navbar-->
    <nav class="navbar">

        <button class="navbar-toggler hamburger-button" type="button" data-toggle="collapse" aria-expanded="false"
            aria-label="Toggle navigation" onclick="Nav()" style="z-index: 2">
            <div class="animated-icon"><span></span><span></span><span></span></div>
        </button>

        <button type="button" class="butout" onclick="redirectToPath('/');">ออกจากระบบ</button>
    </nav>
    <center>
       <div>
          <h1 style="margin-top: 1.5em; font-family:'Kanit', sans-serif ;">แก้ไขข้อมูลตัวอย่างพรรณไม้</h1>
      </div>
     </center>


    <div class="focus">

    
        <div class="content ">
        
            <div class="top">
                <div class="topic">
                    <ul class="rows1">
                        <li>ค้นหาข้อมูลตัวอย่างพรรณไม้</li>
                        <li>Herbarium Database</li>

                    </ul>
                </div>

                <div class="inputsearch">
                    <form action="/displayuptwo" method="post" style="display: flex;">
                    <input type="text" class="form-control insearch"id="keyword" name="keyword" placeholder="ค้นหาข้อมูลตัวอย่างพรรณไม้" >
                        <button class="butsearch" type="submit">Search</button>
                    </form>
                </div>
            </div>

            <div class="mt-2">
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

                </tr>
            </thead>
                    <tbody>`;

    data.forEach((record, index) => {
        htmlResponse += `<tr onclick="redirectToDetails('${record['_id']}')">
                          <td data-label="ลำดับ">${index + 1}</td>
                          <td data-label="MFLU">${record['MFLU']}</td>
                          <td data-label="ชื่อวิทยาศาสตร์"><i>${record['ScientificName']['I']} </i>${record['ScientificName']['II']}</td>
                          <td data-label="ชื่อวงศ์">${record['FamilyName']}</td>
                          <td data-label="ชื่อพื้นเมือง">${record['LocalName']['TH']}</td>
                        </tr>`;
    });

    htmlResponse += `</tbody>
    </table>
</div>
</div>
</div>




</body>

<script>
function Nav() {
var width = document.getElementById("mySidenav").style.width;
if (width === "0px" || width == "") {
document.getElementById("mySidenav").style.width = "300px";
$('.animated-icon').toggleClass('open');
}
else {
document.getElementById("mySidenav").style.width = "0px";
$('.animated-icon').toggleClass('open');
}
}
function redirectToPath(path) {
window.location.href = path;
}
function redirectToDetails(id) {
    // Redirect to the details page with the scientific name as a parameter
    window.location.href = '/updatetwo?id=' + encodeURIComponent(id);
  }

</script>

</html>`;
    return htmlResponse;
};

module.exports = { noResultHtmluptwo, resultHtmlUptwo };