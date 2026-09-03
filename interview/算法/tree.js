const htmlStr = `
    <div>
        <div>
            <span>123</span>
            <a>222</a>
            <div>
                <button>333</button>
                <br/>
            </div>
        </div>
    </div>
`;
const ttt = () => {
  document.body.innerHTML = htmlStr;
  const res = [];
  let height = 0;
  const find = (ele, h = 0) => {
    height = Math.max(height, h);
    res.push(ele);
    Array.from(ele.children).forEach((e) => {
      find(e, h + 1);
    });
  };
  find(document.body);
  console.log("res:", res);
  return height;
};
console.log("ttt():", ttt());
