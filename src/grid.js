export default function grid(n){
  n = parseInt(n);
  let arr = [];

  for(let i = 0; i < n; ++i){
    arr[i] = new Array(n);
    for(let j = 0; j < n; ++j) arr[i][j] = -1;
  }

  function insert(i, j, choice){
    if(arr[i][j] !== -1) return false;
    arr[i][j] = choice;
    return true;
  }

  function checkForWin(i, j, choice){
    let res = checkforUpDown(i, j, choice);
    if(res) return {verdict: true, pos: "updown"};
    res = checkforLeftRight(i, j, choice);
    if(res) return {verdict: true, pos: "leftright"};
    res = checkforLeftDiagonal(i, j, choice);
    if(res) return {verdict: true, pos: "leftdiagonal"};
    res = checkforRightDiagonal(i, j, choice);
    return {verdict: res, pos: "rightdiagonal"};
  }

  function isGridFull(){
    for(let i = 0; i < n; ++i){
      for(let j = 0; j < n; ++j){
        if(arr[i][j] === -1) return false;
      }
    }
    return true;
  }

  function reset(){
    arr = Array.from({ length: n }, () =>
    Array(n).fill(-1));
  }


  function checkforUpDown(i, j, val){

    function dfs(i, j, val, choice){
      if(i >= n || j >= n || i < 0 || j < 0) return 0;
      if(arr[i][j] !== val) return 0;
      return 1 + dfs(choice ? i - 1 : i + 1, j, val, choice)
    }

    let res = dfs(i, j, val, true);
    res += dfs(i, j, val, false) - 1;
    return res === n;
  }

  function checkforLeftRight(i, j, val, choice){

    function dfs(i, j, val, choice){
      if(i >= n || j >= n || i < 0 || j < 0) return 0;
      if(arr[i][j] !== val) return 0;
      return 1 + dfs(i, choice ? j - 1 : j + 1, val, choice)
    }

    let res = dfs(i, j, val, true);
    res += dfs(i, j, val, false) - 1;
    return res === n;
  }

  function checkforLeftDiagonal(i, j, val, choice){
    function dfs(i, j, val, choice){
      if(i >= n || j >= n || i < 0 || j < 0) return 0;
      if(arr[i][j] !== val) return 0;
      return 1 + dfs(choice ? i - 1 : i + 1, choice ? j - 1 : j + 1, val, choice)
    }

    let res = dfs(i, j, val, true);
    res += dfs(i, j, val, false) - 1;
    return res === n;
  }

  function checkforRightDiagonal(i, j, val, choice){
    function dfs(i, j, val, choice){
      if(i >= n || j >= n || i < 0 || j < 0) return 0;
      if(arr[i][j] !== val) return 0;
      return 1 + dfs(choice ? i - 1 : i + 1, choice ? j + 1 : j - 1, val, choice)
    }

    let res = dfs(i, j, val, true);
    res += dfs(i, j, val, false) - 1;
    return res === n;
  }

  return {
    insert, checkForWin, isGridFull, reset
  }
}