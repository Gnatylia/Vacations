import React, { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';


const VacationForm = ({ item, closeForm, getVacations }) => {

    // #region states
    const [description, setDescription] = useState("");
    const [destination, setDestination] = useState("");
    const [photo, setPhoto] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    // #endregion

    useEffect(() => {
        //console.log('VacationForm.useEffect: item = ', item);
        if (item == null) {
            return;
        };
        fillState(item);
    }, [item]);

    const SendForm = (e) => {
        e.preventDefault();
        const _item = { description, destination, photo, date_from: dateFrom, date_to: dateTo, price };
        console.log("SendForm: item ", _item);

        if (!item) {
            fetch("http://localhost:4000/vacations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": sessionStorage.token
                },
                body: JSON.stringify(_item)
            })
                .then(r => r.json())
                .then(response => {
                    console.log("SendForm: resonse = ", response);

                    fillState(null); 
                    //console.log('VacationForm.SendForm[post]: closeForm = ', closeForm);
                    closeForm();
                    getVacations();
                });
        } else {
            
            _item['id'] = item.id;

            fetch("http://localhost:4000/vacations", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": sessionStorage.token
                },
                body: JSON.stringify(_item)
            })
                .then(r => r.json())
                .then(response => {
                    //console.log("VacationForm.SendForm[put]: PUT.resonse = ", response);

                    if (response.err) {
                        setError(response.msg);
                        return;
                    }
                    setError(''); 

                    fillState(null); 
                    //console.log('VacationForm.SendForm[put]: closeForm = ', closeForm);
                    closeForm();
                    getVacations()
                });
        }
    }

    const fillState = (item) => {
        if (item) {
            setDescription(item.description);
            setDestination(item.destination);
            setPhoto(item.photo);
            let _dateFrom = item.date_from.substr(0, item.date_from.indexOf('T'));
            setDateFrom(_dateFrom);
            let _dateTo = item.date_to.substr(0, item.date_to.indexOf('T'));
            setDateTo(_dateTo);
            setPrice(item.price);
        } else {
            setDescription("");
            setDestination("");
            setPhoto("");
            setDateFrom("");
            setDateTo("");
            setPrice("");
        }
    }

    return (
        <div>
            <form className="VacationForm">

                <input
                    type="text"
                    placeholder="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                ></input><br />

                <input
                    type="date"
                    placeholder="dateFrom"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                ></input><br />

                <input
                    type="date"
                    placeholder="dateTo"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                ></input><br />

                <input
                    type="text"
                    placeholder="photo"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                ></input><br />
                <input
                    type="text"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></input><br />
                <input
                    type="text"
                    placeholder="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                ></input><br />

                <Alert className={(error) ? 'show' : 'hide'} variant="danger">{error}</Alert>

                <Button onClick={SendForm}>Save</Button>
              
            </form>
        </div>
    )
}

export default VacationForm