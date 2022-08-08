import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './style/List.css'
export default function StudentData() {
    const [status, setStatus] = useState({
        name: "",
        lastName: "",
        classNr: "",
        numberId: "",
        nameMather: "",
        nameFather: "",
        email: "",
        password: "",
        passwordRep: "",
        role: "",
        address: {
            city: "",
            street: "",
            nr: "",
            zipCode: ""
        },
        results: [],
    });

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [classNr, setClassNr] = useState("");
    const [numberId, setNumberId] = useState("");
    const [nameMather, setNameMather] = useState("");
    const [nameFather, setNameFather] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [nr, setNr] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [update, setUpdate] = useState("");

    let { id } = useParams();

    function editClick(id) {
        setUpdate(id)
    };

    function updateUser(_id) {
        axios.put('http://127.0.0.1:8080/api/user/update/' + id, {
            name, lastName, classNr, numberId, nameMather, nameFather, email,
            address: {
                city, street, nr, zipCode
            }
        })
            .then(() => {
                setUpdate("")
                oneStudent(_id)
            })
    }

    function oneStudent(id) {
        axios.get('http://127.0.0.1:8080/api/user/' + id)
            .then((res) => {
                setStatus(res.data)
            })
    }

    useEffect(() => {
        oneStudent(id)
    }, []);
    if (update === status.id) {
        return (
            <div >
                <table>
                    <thead>
                        <tr>
                            <th colSpan="4">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name"></input>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} name="lastName"></input>
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr className="box">
                            <td >Pesel</td>
                            <td ><input type="text" value={numberId} onChange={(e) => setNumberId(e.target.value)} name="numberId"></input></td>
                        </tr>
                        <tr className="box">
                            <td >Imie Matki</td>
                            <td><input type="text" value={nameMather} onChange={(e) => setNameMather(e.target.value)} name="nameMather"></input></td>
                        </tr>
                        <tr className="box">
                            <td>Imie Ojca</td>
                            <td><input type="text" value={nameFather} onChange={(e) => setNameFather(e.target.value)} name="nameFather"></input></td>
                        </tr>
                        <tr className="box">
                            <td>Email</td>
                            <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email"></input></td>
                        </tr>
                        <tr className="box">
                            <td>Klasa</td>
                            <td><input type="text" value={classNr} onChange={(e) => setClassNr(e.target.value)} name="classNr"></input></td>
                        </tr>
                        <tr className="box">
                            <td>Typ konta</td>
                            <td>{status.role}</td>
                        </tr>
                        <tr className="box">
                            <th className="title-box" colSpan="4">address</th>
                        </tr>

                        <tr className="box">
                            <td>Miasto</td>
                            <td><input type="text" value={city} onChange={(e) => setCity(e.target.value)} name="city"></input></td>
                        </tr>
                        <tr className="box">
                            <td>Ulica i Numer</td>
                            <td>
                                <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} name="street"></input>
                                <input type="text" value={nr} onChange={(e) => setNr(e.target.value)} name="nr"></input>
                            </td>
                        </tr>
                        <tr className="box">
                            <td>Kod Pocztowy</td>
                            <td>
                                <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} name="zipCode"></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="student-add-content">
                    <button className="btn btn-2" onClick={() => updateUser(status._id)}>Zapisz</button>
                    <button className="btn btn-2" onClick={() => setUpdate("")}>Anuluj</button>
                </div>
            </div>
        )
    };
    return (

        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th colSpan="4">
                            Uczeń {status.name} {status.lastName}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="box" colSpan="2">
                            Klasa
                        </td>
                        <td className="box" colSpan="2">
                            {status.classNr}
                        </td>
                    </tr>
                    <tr>
                        <td className="box" colSpan="2">
                            Pesel
                        </td>
                        <td className="box" colSpan="2">
                            {status.numberId}
                        </td>
                    </tr>
                    <tr>
                        <td className="box" colSpan="2">
                            Imie Matki
                        </td>
                        <td className="box" colSpan="2">
                            {status.nameMather}
                        </td>
                    </tr>
                    <tr>
                        <td className="box" colSpan="2">
                            Imie Ojca
                        </td>
                        <td className="box" colSpan="2">
                            {status.nameFather}
                        </td>
                    </tr>
                    <tr>
                        <td className="box" colSpan="2">
                            Email
                        </td>
                        <td className="box" colSpan="2">
                            {status.email}
                        </td>
                    </tr>
                    <tr>
                        <th className="title-box" colSpan="4">
                            Adres
                        </th>
                    </tr>
                    <tr>
                        <td className="box" colSpan="2">
                            Miasto
                        </td>
                        <td className="box" colSpan="2">
                            {status.address.city}
                        </td>
                    </tr>
                    <tr>
                        <td className="box" colSpan="2">
                            Ulica i Numer
                        </td>
                        <td className="box" colSpan="2">
                            {status.address.street} {status.address.nr}
                        </td>
                    </tr>
                    <tr className="box">
                        <td colSpan="2">
                            Kod Pocztowy
                        </td>
                        <td colSpan="2">
                            {status.address.zipCode}
                        </td>
                    </tr>
                    <tr>
                        <th className="title-box" colSpan="4">
                            Oceny
                        </th>
                    </tr>
                    <tr className="box" colSpan="4">
                        <td colSpan="3">
                            {status.results.map((results) => {
                                return (
                                    <>
                                        <tr className="box one">
                                            <th className="title-box one" colSpan="2">
                                                {results?.nameSubject}
                                            </th>
                                        </tr>
                                        <tr className="title-box ">
                                            <td>Nazwa Działu</td>
                                            <td>Rodzaj</td>
                                            <td>Stopień</td>
                                        </tr>
                                        {results.grades.map((grades) => {
                                            return (
                                                <>
                                                    <tr key={grades._id} className="box ">
                                                        <td  >
                                                            {grades?.titleTask}
                                                        </td>
                                                        <td>
                                                            {grades?.genus}
                                                        </td>
                                                        <td>
                                                            {grades?.rating}
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </td>
                    </tr>

                </tbody>
            </table>
            <button className="btn btn-2" onClick={() => {
                setName(status.name)
                setLastName(status.lastName)
                setClassNr(status.classNr)
                setNumberId(status.numberId)
                setNameMather(status.nameMather)
                setNameFather(status.nameFather)
                setEmail(status.email)
                setCity(status.address.city)
                setStreet(status.address.street)
                setNr(status.address.nr)
                setZipCode(status.address.zipCode)
                editClick(status.id)
            }}>Edytuj dane</button>
        </div>
    )
}