	

    // 2008/7/3 Scripted by K-Factory@migiwa
    // 2009/1/27 Modified by K-Factory@migiwa
    // 2014/6/26 Changed characters to cases by xjcl
     
    // *****************************************************************************
    str_CenterT = 'Tie!';
    str_CenterB = 'Undo last choice';
     
    str_ImgPath = 'http://i.imgur.com/';
    var bln_ResultMode = 1;
    var int_ResultImg = 2;
    var int_ResultRank = 3;
     
    var bln_ResultStyle = 0;
     
    var bln_ProgessBar = 1;
     
    var int_Colspan = 3;
    var ary_TitleData = [
       "Phoenix Wright",
       "Justice For All",
       "Trials and Tribulations",
       "Apollo Justice",
       "Ace Attorney Investigations",
       "Ace Attorney Investigations 2",
       "Dual Destinies",
       "Professor Layton vs. Ace Attorney",
    ];
     
    var ary_CharacterData = [
[1, "The First Turnabout", [1, 0, 0, 0, 0, 0, 0, 0]],
[1, "Turnabout Sisters", [1, 0, 0, 0, 0, 0, 0, 0]],
[1, "Turnabout Samurai", [1, 0, 0, 0, 0, 0, 0, 0]],
[1, "Turnabout Goodbyes", [1, 0, 0, 0, 0, 0, 0, 0]],
[1, "Rise from the Ashes", [1, 0, 0, 0, 0, 0, 0, 0]],
[1, "The Lost Turnabout", [0, 1, 0, 0, 0, 0, 0, 0]],
[1, "Reunion, and Turnabout", [0, 1, 0, 0, 0, 0, 0, 0]],
[1, "Turnabout Big Top", [0, 1, 0, 0, 0, 0, 0, 0]],
[1, "Farewell, My Turnabout", [0, 1, 0, 0, 0, 0, 0, 0]],
[1, "Turnabout Memories", [0, 0, 1, 0, 0, 0, 0, 0]],
[1, "The Stolen Turnabout", [0, 0, 1, 0, 0, 0, 0, 0]],
[1, "Recipe for Turnabout", [0, 0, 1, 0, 0, 0, 0, 0]],
[1, "Turnabout Beginnings", [0, 0, 1, 0, 0, 0, 0, 0]],
[1, "Bridge to the Turnabout", [0, 0, 1, 0, 0, 0, 0, 0]],
[1, "Turnabout Trump", [0, 0, 0, 1, 0, 0, 0, 0]],
[1, "Turnabout Corner", [0, 0, 0, 1, 0, 0, 0, 0]],
[1, "Turnabout Serenade", [0, 0, 0, 1, 0, 0, 0, 0]],
[1, "Turnabout Succession", [0, 0, 0, 1, 0, 0, 0, 0]],
[1, "Turnabout Visitor", [0, 0, 0, 0, 1, 0, 0, 0]],
[1, "Turnabout Airlines", [0, 0, 0, 0, 1, 0, 0, 0]],
[1, "The Kidnapped Turnabout", [0, 0, 0, 0, 1, 0, 0, 0]],
[1, "Turnabout Reminiscence", [0, 0, 0, 0, 1, 0, 0, 0]],
[1, "Turnabout Ablaze", [0, 0, 0, 0, 1, 0, 0, 0]],
[1, "Turnabout Target", [0, 0, 0, 0, 0, 1, 0, 0]],
[1, "The Imprisoned Turnabout", [0, 0, 0, 0, 0, 1, 0, 0]],
[1, "The Inherited Turnabout", [0, 0, 0, 0, 0, 1, 0, 0]],
[1, "The Forgotten Turnabout", [0, 0, 0, 0, 0, 1, 0, 0]],
[1, "The Grand Turnabout", [0, 0, 0, 0, 0, 1, 0, 0]],
[1, "Turnabout Countdown", [0, 0, 0, 0, 0, 0, 1, 0]],
[1, "The Monstrous Turnabout", [0, 0, 0, 0, 0, 0, 1, 0]],
[1, "Turnabout Reclaimed", [0, 0, 0, 0, 0, 0, 1, 0]],
[1, "Turnabout Academy", [0, 0, 0, 0, 0, 0, 1, 0]],
[1, "The Cosmic Turnabout", [0, 0, 0, 0, 0, 0, 1, 0]],
[1, "Turnabout for Tomorrow", [0, 0, 0, 0, 0, 0, 1, 0]],
[1, "The English Court", [0, 0, 0, 0, 0, 0, 0, 1]],
[1, "The Fire Witch", [0, 0, 0, 0, 0, 0, 0, 1]],
[1, "The Golden Court", [0, 0, 0, 0, 0, 0, 0, 1]],
[1, "The Final Witch Trial", [0, 0, 0, 0, 0, 0, 0, 1]],
    ];


