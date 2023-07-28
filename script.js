let field = [[0,0,0],[0,0,0],[0,0,0]];
let currentPlayer = 1; //1 - ❌; 2 - ⭕
let finish = false;

window.onload = () => {
   const output = document.getElementById("output");
   const status = document.getElementById("status");

   fillField();

   function clearField() {
      finish = false;
      output.innerHTML = '';
      field = Array.from({length: 3}).map(_ => {
         return Array.from({length: 3}).map(_ => { return 0})
      });
   }

   function fillField() {
      clearField();
      field.forEach((row, index) => {
         let line = document.createElement('div');
         line.classList.add('row');
         output.append(line);
         row.forEach((ceil, col) => {
            let block = document.createElement('div');
            block.classList.add('ceil');
            block.dataset.row = String(index);
            block.dataset.col = String(col);
            block.dataset.value = ceil;
            line.append(block);
         });
      });
   }

   function changePlayer(){
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      status.innerHTML = `Player <span class="p${currentPlayer}"></span>'s move`;
   }

   function check(target){
      let row = parseInt(target.dataset.row);
      let col = parseInt(target.dataset.col);

      let dataForCheck = [field[row],[],[],[]]; // 0 - row; 1 - column; 2,3 - diagonals

      for(let i = 0; i < 3; i++){
         dataForCheck[1].push(field[i][col]);
         dataForCheck[2].push(field[i][i]);
         dataForCheck[3].push(field[i][2-i]);
      }

      dataForCheck.forEach(data => {
         if(data.every(elem => elem === currentPlayer)){
            finish = true;
         }
      })

      return finish;
   }

   document.onclick = (ev) => {
      if(ev.target.id === 'new-game'){
         fillField();
      }
      if(ev.target.className === 'ceil' && !finish) {
         const target = ev.target;
         if(target.dataset.value === '0') {
            field[parseInt(target.dataset.row)][parseInt(target.dataset.col)] = currentPlayer;
            target.dataset.value = String(currentPlayer);
            if(check(target)){
               status.innerHTML = `Player <span class="p${currentPlayer}"></span> wins!`;
            } else {
               changePlayer();
            }
         }
      }
   }
}
