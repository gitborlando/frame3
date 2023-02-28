import './app.css'

export const App = () => {
  let $arr = ['1', '2', '3']
  return (
    <>
      <div1 className="b c-123">123</div1>
      <div2 className="b 456">
        <div3 className="b c-456">456</div3>
        {$arr.map((i) => (
          <div4 className="b 789">789-{i}</div4>
        ))}
        <div5 className="b c-456">456</div5>
      </div2>
      <div6 className="b c-123">123</div6>
      <button onClick={() => $arr.unshift('0')}>btn</button>
    </>
  )
}
