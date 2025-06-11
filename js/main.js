$(document).ready(function () {
  // process bar
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }, 600);
});

function init() {
  $("#title").text(CONFIG.title);
  $("#desc").text(CONFIG.desc);
  $("#yes").text(CONFIG.btnYes);
  $("#no").text(CONFIG.btnNo);
}

function firstQuestion() {
  $(".content").hide();
  Swal.fire({
    title: CONFIG.introTitle,
    text: CONFIG.introDesc,
    imageUrl: "img/logi.gif",
    imageWidth: 300,
    imageHeight: 300,
    background: '#fff url("img/iput-bg.jpg")',
    imageAlt: "Custom image",
    confirmButtonText: CONFIG.btnIntro,
  }).then(function () {
    $(".content").show(200);
  });
}

// switch button position
function switchButton() {
  var audio = new Audio("sound/duck.mp3");
  audio.play();
  var leftNo = $("#no").css("left");
  var topNO = $("#no").css("top");
  var leftY = $("#yes").css("left");
  var topY = $("#yes").css("top");
  $("#no").css("left", leftY);
  $("#no").css("top", topY);
  $("#yes").css("left", leftNo);
  $("#yes").css("top", topNO);
}
// move random button póition
function moveButton() {
  var audio = new Audio("sound/Swish1.mp3");
  audio.play();
  var x = Math.random() * ($(window).width() - $("#no").width()) * 0.9;
  var y = Math.random() * ($(window).height() - $("#no").height()) * 0.9;
  var left = x + "px";
  var top = y + "px";
  $("#no").css("left", left);
  $("#no").css("top", top);
}

init();

var n = 0;
$("#no").mousemove(function () {
  if (n < 1) switchButton();
  if (n > 1) moveButton();
  n++;
});
$("#no").click(() => {
  if (screen.width >= 900) switchButton();
});

// generate text in input
function textGenerate() {
  var n = "";
  var text = " " + CONFIG.reply;
  var a = Array.from(text);
  var textVal = $("#txtReason").val() ? $("#txtReason").val() : "";
  var count = textVal.length;
  if (count > 0) {
    for (let i = 1; i <= count; i++) {
      n = n + a[i];
      if (i == text.length + 1) {
        $("#txtReason").val("");
        n = "";
        break;
      }
    }
  }
  $("#txtReason").val(n);
  setTimeout("textGenerate()", 1);
}

// show popup
$("#yes").click(function () {
  var audio = new Audio("sound/tick.mp3");
  audio.play();
  Swal.fire({
    title: CONFIG.question,
    html: true,
    width: 900,
    padding: "3em",
    html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='Whyyy'>",
    background: '#fff url("img/iput-bg.jpg")',
    backdrop: `
              rgba(0,0,123,0.4)
              url("img/giphy2.gif")
              left top
              no-repeat
            `,
    confirmButtonColor: "#3085d6",
    confirmButtonColor: "#fe8a71",
    confirmButtonText: CONFIG.btnReply,
  }).then((result) => {
    if (result.value) {
      // 💥 Thêm pháo hoa tung bay tại đây:
      confetti({
        particleCount: 150,
        angle: 70,
        spread: 75,
        origin: { x: 0, y: 0.5 }, // Từ trái
      });
      confetti({
        particleCount: 150,
        angle: 120,
        spread: 75,
        origin: { x: 1, y: 0.5 }, // Từ phải
      });

      Swal.fire({
        width: 900,
        title: CONFIG.mess,
        html: `
                    <p>${CONFIG.messDesc}</p>
                    <img src="${CONFIG.messLink}" width="300" height="300" alt="QR Code">
                `,
        confirmButtonText: CONFIG.btnAccept,
        background: '#fff url("img/iput-bg.jpg")',
        confirmButtonColor: "#83d0c9",
      })
      .then(() => {
    // Bắn pháo
    confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 }
    });
    confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 }
    });

    // Hiện ảnh GIF hoặc video mới
    Swal.fire({
        title: 'Tặng em nè 💖',
        html: `<img src="img/logi.gif" width="300" height="300" alt="Cute GIF">`, // Đường dẫn ảnh/gif
        background: '#fff',
        showConfirmButton: false,
        timer: 4000 // tự tắt sau 4s
    });
});
    }
  });
});

document.addEventListener(
  "click",
  function () {
    var audio = document.getElementById("bgMusic");
    audio.muted = false;
    audio.play();
  },
  { once: true }
);
