import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

export default function MyGrades(_id) {
    let { id } = useParams()
    const [more, setMore] = useState(false)
    const [status, setStatus] = useState({
        name: "",
        lastName: "",
        results: [],
    });
    
    function oneUser(id) {
        axios.get('http://127.0.0.1:8080/api/user/' + id)
            .then((res) => {
                setStatus(res.data)

            })
    };

    useEffect(() => {
        oneUser(id)
    }, [])

    return (
        <div>
            <table className="myGreades">
                <thead>
                    <tr>
                        <th colSpan="4">Oceny:{status.name} {status.lastName}</th>
                    </tr>
                </thead>
                <tbody>
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
                                            <td>Rodzaj</td>
                                            <td>Nazwa działu</td>
                                            <td>Stopień</td>
                                        </tr>
                                        {results.grades.map((grades) => {
                                            return (
                                                <>
                                                    <tr className="box ">
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
                                                    {more &&
                                                        <tr>
                                                            <td colSpan="3">
                                                                {grades?.textarea}
                                                            </td>
                                                        </tr>}
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
            <button className="btn" onClick={() => setMore(!more)}>{more ? "Ukryj opisy" : "Wyswetl opisy"}</button>
        </div>
    )
}