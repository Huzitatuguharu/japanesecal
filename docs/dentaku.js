//変数の定義
let answer = ""; //answer
let clearflag = false; //数字
let enzan = ""; //演算記号
let dot = false; //小数点。
let errorflag = false; //エラーフラグ
let cflag = false; //ac.c


// 4が含まれている確認
function fourchek() {
  let F = new Array;
  let num = String(answer);
  F = (num).split('');
  if (F.includes('4')) {
    $("#answer").val("");
    answer = "";
    $("#answer").val("error!");
    errorflag = true;
    console.log('4 が見つかりました');
    $("#clear").val("AC");
    clear();
    return false;
  }
}
// AC以外無効
function clear() {
  $(".number").prop("disabled", true);
  $(".kigou").prop("disabled", true);
}

//ACを押すと値がクリアされる。
$(function () {
  $("#clear").click(function () {
    location.reload();
    //cflag = true ACがCになっていたら
    if (cflag == true) {
      $("#answer").val("");
      cflag = false;
      $("#clear").val("AC");
      $(".number").prop("disabled", false);
      console.log(answer);
    } //clag = false ACのとき
    else if (cflag == false) {
      $("#answer").val("");
      answer = "";
      $("#clear").val("AC");
      //演算記号もクリアにしておく。
      enzan = "";
      $("#dot").prop("disabled", false);
      $(".number").prop("disabled", false);
      dot = false;
      clearflag = false;
      errorflag = false;
      console.log(answer);
    }
  });
});

//数字ボタンを押すと数値が入力される。
$(function () {
  $(".number").click(function () {
    //入力可能桁数を10桁までにする
    if ($("#answer").val().length >= 10) {
      clear()

      $("#answer").val("error!");
    } else {
      //cleaflag = trueなら表示中の数字をクリアする。
      if (clearflag === true) {
        $("#answer").val("");
        //数字を押したときに表示がクリアされるようクリアフラグを立てる
        clearflag = false;
        //小数点をまた押せるようにする
        $("#dot").prop("disabled", false);
      }
    }

    //AC表示をCに切り替える
    $("#clear").val("AC");
    Number($("#answer").val($("#answer").val() + $(this).val()));
    cflag = true;
  });
});

//小数点が1度押されたら表示中に2度はむり
$(function () {
  $("#dot").on("click", function () {
    $("#dot").prop("disabled", true);
    Number($("#answer").val($("#answer").val() + $(this).val()));
  });
});

//足し算記号を押したらenzanClickに"+"
$(function () {
  $("#addition").click(function () {
    enzanClick("+")
  });
});

//引き算記号を押したらenzanClickに"-"
$(function () {
  $("#substraction").click(function () {
    enzanClick("-")
  });
});

//掛け算記号を押したらenzanClickに"×"
$(function () {
  $("#multiplication").click(function () {
    enzanClick("×")
  });
});

//割り算記号を押したらenzanClickに"÷"
$(function () {
  $("#devision").click(function () {
    enzanClick("÷")
  });
});

//%を押したら表示中の数字×0.01
$(function () {
  $("#percent").click(function () {
    $("#answer").val(Number($("#answer").val()) * 0.01);
  });
});

//+/-を押したら表示中の数字×(-1)
$(function () {
  $("#plusminus").click(function () {
    $("#answer").val(Number($("#answer").val()) * (-1));
  });
});

//前の演算記号を覚えてなければ今の表示している値をanswerに保存
function enzanClick(kigou) {
  if (enzan === "") {
    answer = Number($("#answer").val());
  } else {
    enzanClick1()
  }
  //表示桁を10桁まで、４チェック
  fourchek()
  digit()

  clearflag = true;
  enzan = kigou;
}

//演算記号に何か覚えていれば、answerに保存した値と表示中の値と記憶した演算記号で計算する。
function enzanClick1() {
  if (enzan === "+") {
    console.log("+")
    answer += Number($("#answer").val());
  } else if (enzan === "-") {
    answer -= Number($("#answer").val());
    console.log("-")
  } else if (enzan === "×") {
    answer *= Number($("#answer").val());
    console.log("kake")
  } else if (enzan === "÷") {
    answer /= Number($("#answer").val());
  }
}

//＝を押したとき
$(function () {
  $("#equal").click(function () {
    enzanClick1()
    fourchek()
    digit()
    clearflag = false;
    cflag = false;
    $("#clear").val("AC");
    clear()
  });
});

//表示桁を10桁以内にする
function digit() {
  //小数点
  let num1 = String(answer).split(".");

  //整数部で11桁以上
  if (num1[0].length > 10) {

    $("#answer").val("error!");
    errorflag = true;
    clear()
  }
  //整数部が10桁までの場合、整数部はそのまま表示、少数部は値を丸
  else if (String(answer).length >= 10 && num1[0].length <= 10) {
    let n = 10 - num1[0].length;
    answer = Number(answer).toFixed(n);
    $("#answer").val(answer);
  } else {
    $("#answer").val(answer);
  }

}
