// 2008/7/3 Scripted by K-Factory@migiwa
// 2008/7/19 Modified by  K-Factory@migiwa
// ・イラストのランダム化
// ・BugFix
// 2008/7/25 Modified by  K-Factory@migiwa
// ・ランキングにイラスト表示
// ・メンテナンス用PG追加
// ・BugFix
// 2009/1/27 Modified by  K-Factory@migiwa
// ・絵の表示ON/OFF追加
// ・高速化処理追加
// 2009/9/8 Modified by  K-Factory@migiwa
// ・タイトル分類の変更
// 2013/1/22 Modified by Anonymous
// added undo function (requires minor changes in index.html and fnc_data.js)
// 2013/6/26 Modified by xjcl
// removed image functionality; changed characters to cases

// 実行コードです。
// 修正する場合は気をつけてください。
var ary_TempData   = new Array();
var ary_SortData   = new Array();
var ary_ParentData = new Array();
var ary_EqualData  = new Array();
var int_LeftList,  int_LeftID;
var int_RightList, int_RightID;
var ary_RecordData = new Array();
var int_RecordID = 0;

var csort = new Array();
var csort2 = new Array();
var csort3 = new Array();
var csort4 = new Array();
var csort5 = new Array();
var csort6 = new Array();

var int_Count = 0;
var int_Total = 0;
var int_Completed = 0;
var int_Status = 0;
var sID = 'GaGprog';
var iGM = 100;


var blacklist = new Array();

// *****************************************************************************
// * StartUp
// * <BODY>タグの読み込み終了時に実行。
function startup() {
   var tbl_Select = gID('optTable');
   var tbl_body_Select = cE('tbody');
   tbl_Select.appendChild(tbl_body_Select);

   // タイトルから選択用チェックボックスに変換
   for (i=0; i<ary_TitleData.length; i++) {
      // Row[i]
      if ((i % int_Colspan) == 0) {
         var new_row = tbl_body_Select.insertRow(tbl_body_Select.rows.length);
         new_row.id = 'optSelRow' + i;
      }
      // Col[0]
      var new_cell = new_row.insertCell(new_row.childNodes.length);
      var new_CheckBox = cE('input');
      new_CheckBox.setAttribute('type', 'checkbox', 0);
      new_CheckBox.setAttribute('checked', 'true', 0);
      new_CheckBox.value = ary_TitleData[i];
      new_CheckBox.title = ary_TitleData[i];
      new_CheckBox.id = 'optSelect' + i;
      new_cell.appendChild(new_CheckBox);

      var new_span = cE('span');
      new_span.appendChild(cT(ary_TitleData[i]));
      new_span.title = ary_TitleData[i];
      new_span.id = i;
      sC(new_span, 'cbox');
      new_span.onclick = function() {chgFlag(this.id);}
      new_cell.appendChild(new_span);
   }


   var tbl_foot_Select = cE('tfoot');
   tbl_Select.appendChild(tbl_foot_Select);

   // Row[0]
   var new_row = tbl_foot_Select.insertRow(tbl_foot_Select.rows.length);
   sC(new_row, "opt_foot");

   var new_cell = new_row.insertCell(new_row.childNodes.length);
   new_cell.setAttribute('colspan', int_Colspan, 0);
   var new_CheckBox = cE('input');
   new_CheckBox.setAttribute('type', 'checkbox', 0);
   new_CheckBox.setAttribute('checked', 'true', 0);
   new_CheckBox.value = "All";
   new_CheckBox.title = "All boxes are checked/unchecked at the same time.";
   new_CheckBox.id = 'optSelect_all';
   new_CheckBox.onclick = function() {chgAll();}
   new_cell.appendChild(new_CheckBox);

   var new_span = cE('span');
   new_span.appendChild(cT("Select All"));
   new_cell.appendChild(new_span);


   if (!bln_ProgessBar) fCG(sID, iGM, iGM);
}

function chgAll() {
   for (i=0; i<ary_TitleData.length; i++) {
      gID('optSelect' + i).checked = gID('optSelect_all').checked;
   }
}

// *****************************************************************************
// * chgFlag
// * タイトル名がクリックされてもチェックボックスを変更する。
function chgFlag(int_id) {
   var obj_Check = gID('optSelect' + int_id);
   if (!obj_Check.disabled) {
      obj_Check.checked = (obj_Check.checked) ? false :true;
   }
}

// *****************************************************************************
// * Initialize
// * 使用する配列や、カウンターを初期化する
// * 初回のみ動作。
function init(){
   int_Total = 0;
   int_RecordID = 0;

   // ソート対象のみを抽出
   for (i=0; i<ary_CharacterData.length; i++) {
      for (j=0; j<ary_TitleData.length; j++) {
         if (gID('optSelect' + j).checked && (ary_CharacterData[i][2][j] == 1)) {
            ary_TempData[int_Total] = ary_CharacterData[i];
            int_Total++;
            break;
         }
      }
   }

   if (int_Total == 0) {
      alert("Please make a selection.");
      return;
   } else {
      for (i=0; i<ary_TitleData.length; i++) {
         gID('optSelect' + i).disabled = true;
      }
   }

   int_Total = 0;

   // ソート配列にIDを格納する
   ary_SortData[0] = new Array();
   for (i=0; i<ary_TempData.length; i++) {
      ary_SortData[0][i] = i;

      // 保存用配列
      ary_RecordData[i] = 0;
   }

   var int_Pointer = 1;
   for (i=0; i<ary_SortData.length; i++) {
      // #ソートは基本ロジックを流用
      // 要素数が２以上なら２分割し、
      // 分割された配列をary_SortDataの最後に加える
      if (ary_SortData[i].length >= 2) {
         var int_Marker = Math.ceil(ary_SortData[i].length / 2);
         ary_SortData[int_Pointer] = ary_SortData[i].slice(0, int_Marker);
         int_Total += ary_SortData[int_Pointer].length;
         ary_ParentData[int_Pointer] = i;
         int_Pointer++;

         ary_SortData[int_Pointer] = ary_SortData[i].slice(int_Marker, ary_SortData[i].length);
         int_Total += ary_SortData[int_Pointer].length;
         ary_ParentData[int_Pointer] = i;
         int_Pointer++;
      }
   }

   // 引き分けの結果を保存するリスト
   // キー：リンク始点の値
   // 値 ：リンク終点の値
   for (i=0; i<=ary_TempData.length; i++) {
      ary_EqualData[i] = -1;
   }

   int_LeftList  = ary_SortData.length - 2;
   int_RightList = ary_SortData.length - 1;
   int_LeftID    = 0;
   int_RightID   = 0;
   int_Count     = 1;
   int_Completed = 0;

   // イニシャライズが終了したのでステータスを1に変更
   int_Status    = 1;

   gID('fldMiddleT').innerHTML = str_CenterT;
   gID('fldMiddleB').innerHTML = str_CenterB;

   fnc_ShowData();
}


// Undo previous choice (

function fnc_Undo() {

    // undoing is DEPRECATED since adding blacklist
    // doesn't fnc_Undo() but still starts / shows data

   if (int_Status == 0) {
      fnc_Sort(0);
	  return;
   }
   
      // 'Remove both'
      fnc_Remove(0);
      
}

/* Debugging purposes (simulates choosing Tie until completion)

function fnc_TieRest(){
	while(int_Status < 2){
		fnc_Sort(0);
	}
}
*/

// *****************************************************************************
// * Sort (-1:左側, 0:引き分け, 1:右側)


function fnc_Sort(int_SelectID) {

	//back_ary_TempData = ary_TempData.slice(0);	
	back_ary_SortData = ary_SortData.slice(0); // an array of arrays
	                // initially: counts up and repeats (0,1,2..n)
	                // shrinks by two every click
	                // unless it doesn't always (towards the end)
	                // not cutting coincides with staying on the field
	                // (see RecordID)
	back_ary_RecordData = ary_RecordData.slice(0); //0,0,0,0... len(album)
	                // it only changes after some time.
	                // and even then resets at times.
	                // suggesting it builds a 'pre-sort'
	                // and then feeds values into RecordData if the users
	                // continues as predicted (else it will wipe)
	back_int_RecordID = int_RecordID;
	                // the loser of a duel stays on the field sometimes.
	                // if that happens, the CONSECUTIVE losses are counted.
	                // so it goes through 0,1,2,3,4,5,6...
	                // until it is swapped out for another candidate
	back_ary_EqualData = ary_EqualData.slice(0); //-1,-1,-1,-1... len(album)+1
	                // when tied, includes reference to partner. example:
	                // 17: 18, but 18: -1 (stays at default value)
	back_ary_ParentData = ary_ParentData.slice(0); //0,0,1,1,2,2,3,3...
	                // and sth weird at the end?? ...29,29,30,30,31,31,47,47
	                // and it seems to be constant as well.
	                // yup. it is only changed in init.
	
	
	
	
   // ステータスにより処理を分岐
   switch (int_Status) {
      case 0:
         // 初回クリック時、ソート情報を初期化する。
         init();
      case 2:
         // ソートが終了していた場合、ソート処理は行わない。
         return;
      default:
   }
   
   // ary_RecordDataに保存
   // 左側Count
   if (int_SelectID != 1) {
      fnc_CountUp(0);
      while (ary_EqualData[ary_RecordData[int_RecordID-1]] != -1) {
         fnc_CountUp(0);
      }
   }

   // 引き分けの場合のみ
   if (int_SelectID == 0) {
      ary_EqualData[ary_RecordData[int_RecordID-1]] = ary_SortData[int_RightList][int_RightID];
   }

   // 右側Count
   if (int_SelectID != -1) {
      fnc_CountUp(1);
      while (ary_EqualData[ary_RecordData[int_RecordID-1]] != -1) {
         fnc_CountUp(1);
      }
   }

   // 片方のリストを走査し終えた後の処理
   if (int_LeftID < ary_SortData[int_LeftList].length && int_RightID == ary_SortData[int_RightList].length) {
      // リストint_RightListが走査済 - リストint_LeftListの残りをコピー
      while (int_LeftID < ary_SortData[int_LeftList].length){
         fnc_CountUp(0);
      }
   } else if (int_LeftID == ary_SortData[int_LeftList].length && int_RightID < ary_SortData[int_RightList].length) {
      // リストint_LeftListが走査済 - リストint_RightListの残りをコピー
      while (int_RightID < ary_SortData[int_RightList].length){
         fnc_CountUp(1);
      }
   }

   //両方のリストの最後に到達した場合は
   //親リストを更新する
   if (int_LeftID == ary_SortData[int_LeftList].length && int_RightID == ary_SortData[int_RightList].length) {
      for (i=0; i<ary_SortData[int_LeftList].length + ary_SortData[int_RightList].length; i++) {
         ary_SortData[ary_ParentData[int_LeftList]][i] = ary_RecordData[i];
      }

      ary_SortData.pop();
      ary_SortData.pop();
      int_LeftList  = int_LeftList - 2;
      int_RightList = int_RightList - 2;
      int_LeftID    = 0;
      int_RightID   = 0;

      //新しい比較を行う前にary_RecordDataを初期化
      if (int_LeftID == 0 && int_RightID == 0) {
         for (i=0; i<ary_TempData.length; i++) {
            ary_RecordData[i] = 0;
         }
         int_RecordID = 0;
      }
   }

   // 終了チェック
   int_Status = (int_LeftList < 0) ? 2 : 1;

   fnc_ShowData();
}





function fnc_Autosort() {
    // after popping up options, check if one is black-
    // listed and selects the other one.
    
    unique_id_left  = ary_SortData[int_LeftList][int_LeftID];
    unique_id_right = ary_SortData[int_RightList][int_RightID];
    
    console.log(unique_id_left);
    console.log(unique_id_right);
    
    var l = blacklist.indexOf( unique_id_left  );
    var r = blacklist.indexOf( unique_id_right );
    
    
    if (l != -1 && r != -1) {
        fnc_Sort( 0);
    }
    
    if (l != -1) {
        // if only left in blacklist, vote for right
        fnc_Sort( 1);
    }
    
    if (r != -1) {
        fnc_Sort(-1);
    }
    console.log("autosuck end");

}


function fnc_Remove(int_SelectID) {
    // SelectID: -1 for left, 1 for right
    
    // 'removes' one character by blacklisting them and
    // making the other character win battles automatically.
    
    // TODO this
    // TODO detect ties
    // TODO fix undo
    
    // go through both if ID == 0
    if (int_SelectID != -1) {
        blacklist.push( ary_SortData[int_RightList][int_RightID]    );
    }
    if (int_SelectID !=  1) {
        blacklist.push( ary_SortData[int_LeftList][int_LeftID]  );
    }

    fnc_Autosort();

}

// *****************************************************************************
// * CountUp(0:左側 1:右側)
// * 選択された方をカウントアップする。
function fnc_CountUp(int_Select) {
   ary_RecordData[int_RecordID] = ary_SortData[((int_Select == 0) ? int_LeftList : int_RightList)][((int_Select == 0) ? int_LeftID : int_RightID)];
    
   if (int_Select == 0) {
      int_LeftID++;
   } else {
      int_RightID++;
   }

   int_RecordID++;
   int_Completed++;
   
}

// *****************************************************************************
// * ShowData
// * 進捗率と名前を表示する。
function fnc_ShowData() {
	
	// shows data at the end
	// AND updates / pushes next battle if there are some left
	
   gID("lblCount").innerHTML = int_Count;
   gID("lblProgress").innerHTML = Math.floor(int_Completed * 100 / int_Total);
   if (!bln_ProgessBar) eGR(sID, Math.floor(int_Completed * 100 / int_Total));

   if (int_Status == 2) {
      // 判定が終了していた場合、結果表示。
      var int_Result = 1;

      var tbl_Result = cE('table');
      tbl_Result.id = 'resTable';

      var tbl_head_Result = cE('thead');
      tbl_Result.appendChild(tbl_head_Result);

      new_row = tbl_head_Result.insertRow(tbl_head_Result.rows.length);

      // Col[0]
      new_cell = new_row.insertCell(new_row.childNodes.length);
      sC(new_cell, 'resTableH');
      new_cell.appendChild(cT('Order'));
      // Col[1]
      new_cell = new_row.insertCell(new_row.childNodes.length);
      sC(new_cell, 'resTableH');
      new_cell.appendChild(cT('Name'));

      var tbl_body_Result = cE('tbody');
      tbl_Result.appendChild(tbl_body_Result);

      var int_Same = 1;

      for (i=0; i<ary_TempData.length; i++) {
        if (blacklist.indexOf(ary_SortData[0][i]) == -1) {
         new_row = tbl_body_Result.insertRow(tbl_body_Result.rows.length);

         // Col[0]
         new_cell = new_row.insertCell(new_row.childNodes.length);
         sC(new_cell, 'resTableL');
         new_cell.appendChild(cT(int_Result));
		 
		 csort2[i] = int_Result; // v2a
		 
         // Col[1]
         new_cell = new_row.insertCell(new_row.childNodes.length);
         sC(new_cell, 'resTableR');
         

         if ((int_ResultImg == 2)) {
            new_cell.appendChild(cT(ary_TempData[ary_SortData[0][i]][1]));
			csort4[i] = ary_TempData[ary_SortData[0][i]][1]; // v2a
			csort6[i] = ary_TempData[ary_SortData[0][i]][1]; // v2a
         }

         if (i < ary_TempData.length - 1) {
            if (bln_ResultMode == 0) {
               if (ary_EqualData[ary_SortData[0][i]] == ary_SortData[0][i + 1]) {
                  int_Result++;
               }
            } else {
               if (ary_EqualData[ary_SortData[0][i]] == ary_SortData[0][i + 1]) {
                  int_Same++;
               } else {
                  int_Result += int_Same;
                  int_Same = 1;
               }
            }
         }
      }
    }
      var obj_SelectItem = gID("resultField");
      obj_SelectItem.innerHTML = "";
      obj_SelectItem.appendChild(tbl_Result);

      if (bln_ResultStyle == 1) {
         gID("mainTable").style.display = 'none';
      }
	  if (bln_ResultStyle == 0) {
         gID("ranTable").style.display = 'inline';
      } // v2a
	  
	  // v2a start
	  
	  for (i=0; i<10; i++) 
		{
		if(csort4[i] == undefined)
			{
			break;
			}
		else
			{
			csort +=  csort2[i];
			csort += '位： ';
			csort4[i] = csort4[i].replace(/・(.*)/g, "");
			csort +=  csort4[i];
			csort += '　';
			}  
		}
			
		for (i=0; i<130; i++) 
		{
		if(csort4[i] == undefined)
			{
			break;
			}
		else
			{
			csort5 +=  csort2[i];
			csort5 += '. ';
			csort5 +=  csort6[i];
			csort5 += '<br>';
			}
		}
		
	  // v2a end	

   } else {
      // 判定が終了していない場合、選択肢を更新。
      for (i=0; i<2; i++) {
         var obj_SelectItem = gID((i == 0) ? "fldLeft" : "fldRight");
         var obj_TempData = ary_TempData[ary_SortData[(i == 0)  ? int_LeftList : int_RightList][(i == 0)  ? int_LeftID : int_RightID]];
         
            var obj_Item = cE("span");
            obj_Item.appendChild(cT(obj_TempData[1]));
         
         obj_Item.title = obj_TempData[1];
         obj_SelectItem.replaceChild(obj_Item, obj_SelectItem.firstChild);
      }

      int_Count++;
      fnc_Autosort();
   }
}

function fnc_CC(sID, sClass) {

   sC(gID(sID), sClass);
}
