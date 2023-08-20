import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let data = [
  {
    "id": 1,
    "name": "珍珠奶茶",
    "description": "香濃奶茶搭配QQ珍珠",
    "price": 50
  },
  {
    "id": 2,
    "name": "冬瓜檸檬",
    "description": "清新冬瓜配上新鮮檸檬",
    "price": 45
  },
  {
    "id": 3,
    "name": "翡翠檸檬",
    "description": "綠茶與檸檬的完美結合",
    "price": 55
  },
  {
    "id": 4,
    "name": "四季春茶",
    "description": "香醇四季春茶，回甘無比",
    "price": 45
  },
  {
    "id": 5,
    "name": "阿薩姆奶茶",
    "description": "阿薩姆紅茶搭配香醇鮮奶",
    "price": 50
  },
  {
    "id": 6,
    "name": "檸檬冰茶",
    "description": "檸檬與冰茶的清新組合",
    "price": 45
  },
  {
    "id": 7,
    "name": "芒果綠茶",
    "description": "芒果與綠茶的獨特風味",
    "price": 55
  },
  {
    "id": 8,
    "name": "抹茶拿鐵",
    "description": "抹茶與鮮奶的絕配",
    "price": 60
  }
];

function App() {
  const [product, setProduct] = useState(data); //產品列表
  const [pick, setPick] = useState([]); //購物車
  const [sum, setSum] = useState(0); //總金額
  const [order, setOrder] = useState([]); //訂單
  const [text, setText] = useState(""); //備註

  //購物車增加品項
  const addPick = (drink)=>{
    // setPick([
    //   ...pick,
    //   {
    //     ...drink, //匯入選擇到的產品
    //     id: new Date().getTime(), //更改他的id
    //     qty: 1,
    //     subtotal: drink.price
    //   }
    // ]);

    //先尋找購物車是否有該元素
    const existingItem = pick.find((item) => item.name === drink.name);
    if (existingItem) {
    // 如果元素已存在，增加其数量
    const newPick = pick.map((item) =>
      item.name === drink.name
        ? {
            ...item,
            qty: item.qty + 1,
            subtotal: item.subtotal + item.price,
          }
        : item
    );
      setPick(newPick);
    } else {
      // 如果项不存在，将其添加到数组中
      setPick([
        ...pick,
        {
          ...drink,
          id: new Date().getTime(),
          qty: 1,
          subtotal: drink.price,
        },
      ]);
    }
  }
  //購物車更新品項
  const updatePick = (item, value)=>{
    const newPick = pick.map(pick=>{
      if(pick.id === item.id){
        return {
          ...pick,
          qty: parseInt(value),
          subtotal: pick.price * parseInt(value)
        }
      }
      return pick
    })
    setPick(newPick)
  }

  //送出訂單
  const sendOrder = ()=>{
    const value = document.querySelector("textarea[placeholder='備註']").value;
    setText(value);
    setOrder([
      ...pick,
    ]);
  }
  useEffect(()=>{
    const total = pick.reduce((acc,cur)=>{
      return acc + cur.subtotal
    },0)
    setSum(total)
  },[pick])  //購物車有變動時就執行

  // useEffect(()=>{
  //   const total = order.reduce((acc,cur)=>{
  //     return acc + cur.subtotal
  //   },0)
  //   setSum(total)
  // },[order])  //購物車有變動時就執行

  return(<>
    <div id="root">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="list-group">
              {
                product.map(item=>{
                  return (
                    <a key={item.id} href="#" onClick={(e)=>{
                      e.preventDefault();
                      addPick(item)
                    }} className="list-group-item list-group-item-action"
                ><div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{item.name}</h5>
                  <small>$50</small>
                </div>
                <p className="mb-1">{item.description}</p></a>
                  )
                })
              }
            </div>
          </div>
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" width="50">操作</th>
                  <th scope="col">品項</th>
                  <th scope="col">描述</th>
                  <th scope="col" width="90">數量</th>
                  <th scope="col">單價</th>
                  <th scope="col">小計</th>
                </tr>
              </thead>
              <tbody>
                {
                  pick.length ?
                  pick.map(item=>{
                    return(<tr key={item.id}>
                      <td><button onClick={()=>{
                        setPick(pick.filter(deleteOption=>{
                          return item.id != deleteOption.id
                        }))
                      }} type="button" className="btn btn-sm">x</button></td>
                      <td>{item.name}</td>
                      <td><small>{item.description}</small></td>
                      <td>
                        <select className="form-select" value={item.qty} onChange={(e)=>{
                          const value = e.target.value;
                          updatePick(item,value)
                        }}>
                          {
                            [1,2,3,4,5,6,7,8,9,10].map((newItem,index)=>{
                              return(<option key={index} value={newItem}>{newItem}</option>)
                            })
                          }
                        </select>
                      </td>
                      <td>{item.price}</td>
                      <td>{item.subtotal}</td>
                    </tr>)
                  })
                  :
                  <tr>
                    <td colSpan={6}>選擇你喜愛的飲料吧~</td>
                  </tr>
                }
              </tbody>
            </table>
            <div className="text-end mb-3">
              <h5>總計: <span>${sum}</span></h5>
            </div>
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="備註"
            ></textarea>
            <div className="text-end">
              <button className="btn btn-primary" onClick={()=>{
                sendOrder()
              }}>送出</button>
            </div>
          </div>
        </div>
        <hr />
        <div className="row justify-content-center">
          <div className="col-8">
            {
              order.length>0 ? <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h5>訂單</h5>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">品項</th>
                        <th scope="col">數量</th>
                        <th scope="col">小計</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        order.map(item=>{
                          return(
                            <tr key={item.id}>
                              <td>{item.name}</td>
                              <td>{item.qty}</td>
                              <td>{item.subtotal}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                  <div className="text-end">備註: <span>{text}</span></div>
                  <div className="text-end">
                    <h5>總計: <span>${order.length>0 ? sum : ""}</span></h5>
                  </div>
                </div>
              </div>
            </div>
            :
            <div>我在等你的訂單～</div>
            }
            
          </div>
        </div>
      </div>
    </div>

  </>)
}

export default App
