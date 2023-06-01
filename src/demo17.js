import React, { useState } from "react";
export function Mation() {
    const [input, setInput] = useState({ name: "", surname: "", email: "", password: "", age: "", gender: "", hobby: [], })
    const [create, setCreate] = useState(JSON.parse(localStorage.getItem("create")) || [])
    const [stop, setStop] = useState(JSON.parse(localStorage.getItem("data")))
    const [isedit, setIsedit] = useState(-1);
    // hobby 
    const handelchange = (e) => {
        if (e.target.checked) {
            setInput({ ...input, hobby: [...input.hobby, e.target.value] })
        }
        else {
            setInput({ ...input, hobby: [...input.hobby.filter(value => value !== e.target.value)] })
        }
        console.log(e.target.checked, e.target.value)
    }

    function change(e) {
        console.log(e.target)
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }
    function Info(e) {
        if (isedit === -1) {
            console.log(e.target)
            setCreate([...create, input])
            localStorage.setItem("create", JSON.stringify([...create, input]))
        }
        else {
            const upadatedata = create.map((item, index) => {
                if (index === isedit) { return input }
                return item
            })
            setCreate(upadatedata)
            localStorage.setItem("create", JSON.stringify(upadatedata))
        }
    }
    console.log(input)
    // delete
    const handeldelete = (idx) => {
        const deleterecord = create.filter((item, index) => index !== idx)
        setCreate(deleterecord)
        localStorage.setItem("create", JSON.stringify(deleterecord))
    }
    //  edit
    const handeledit = (iddx) => {
        setIsedit(iddx)
        const record = create.find((item, index) => index === iddx)
        setInput(record)
    };
    const handleAllChange = (e) => {
        const { name, checked } = e.target
        if (name === "select") {
            const allCheck = create.map((user) => {
                return { ...user, isChecked: checked }
            })
            setCreate(allCheck)
        }
        else {
            const allCheck = create.map((user) => {
                if (user?.name === e.target.name) {
                    return { ...user, isChecked: checked }
                }
                else { return user }
            })
            setCreate(allCheck)
        }
    }
    // search 
    const handelSearch = (e) => {
        const value = e.target.value
        if (!value) {
            setCreate(stop)
            return
        }
        const update = create.filter((item) => {
            return item.name?.toLowerCase().includes(value?.toLowerCase())
        })
        setCreate(update)
    }
    return (
        <>
            <div>
                <form style={{ backgroundColor: "lightyellow", border: "4px solid black", padding: "25px", margin: "25px" }}>
                    <h1>React from 17</h1>
                    <label htmlFor="name">name : </label>
                    <input type="text" name="name" value={input.name} onChange={change} /><br /><br />
                    <label htmlFor="surname">surname : </label>
                    <input type="surname" name="surname" value={input.surname} onChange={change} /><br /><br />
                    <label htmlFor="email">email : </label>
                    <input type="email" name="email" value={input.email} onChange={change} /><br /><br />
                    <label htmlFor="password">password : </label>
                    <input type="password" name="password" value={input.password} onChange={change} /><br /><br />
                    <label htmlFor="age">age : </label>
                    <input type="number" name="age" value={input.age} onChange={change} /><br /><br />
                    <label htmlFor="gender">gender : </label>
                    <input type="radio" id="female" name="gender" value="female" onChange={change} />female
                    <input type="radio" id="male" name="gender" value="male" onChange={change} />male<br /><br />
                    <label htmlFor="hobby">hobby : </label>
                    <input type="checkbox" id="cooking" name="cooking" value="cooking" onChange={handelchange} />cooking
                    <input type="checkbox" id="drawing" name="drawing" value="drawing" onChange={handelchange} />drawing
                    <input type="checkbox" id="writing" name="writing" value="writing" onChange={handelchange} />writing
                    <input type="checkbox" id="reading" name="reading" value="reading" onChange={handelchange} />reading<br /><br />
                    <button class="button-89" onClick={Info}>submit</button><br /><br />
                    <input type="text" placeholder="Search" onKeyUp={(e) => handelSearch(e)} />

                </form>
                <table style={{ backgroundColor: "inherit", border: "4px solid black", padding: "25px", margin: "25px" }}>
                    <thead>
                        <th>name</th>
                        <th>surname</th>
                        <th>email</th>
                        <th>password</th>
                        <th>age</th>
                        <th>gender</th>
                        <th>hobby</th>
                        <th>button</th>
                        <th>button</th>
                        <th>checkbox<input type="checkbox" name="select" checked={create.every((user) => user?.isChecked)} onChange={handleAllChange} /></th>
                    </thead>
                    <tbody>
                        {create.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.surname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.password}</td>
                                    <td>{item.age}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.hobby} </td>
                                    <td><button class="button-62" onClick={() => handeldelete(index)}>delete</button></td>
                                    <td><button class="button-62" onClick={() => handeledit(index)}>edit</button></td>
                                    <th><input type="checkbox" name={item.name} checked={item.isChecked} onChange={handleAllChange} /></th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}