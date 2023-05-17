import React from 'react';

const VacationItem = ({ item, editItem }) => {


    const role = sessionStorage.getItem('role');

    const toggle = (elem) => {
        //console.log("elem = ", elem)
        elem.classList.toggle('checked');

        if (elem.classList.contains('checked')) {
            fetch("http://localhost:4000/folows/" + item.id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": sessionStorage.token
                }
            })
                .then(r => r.json())
                .then(response => {
                    //console.log("toggle: response = ", response);
                })
        } else {

            fetch("http://localhost:4000/folows/" + item.id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": sessionStorage.token
                }
            })
                .then(r => r.json())
                .then(response => {
                    console.log("toggle: response = ", response);

                })
            console.log('VacationItem.toggle: remove folow');
        }
    }

    const removeItem = () => {

        if (!window.confirm('are you sure?')) {
            return;
        }
        fetch("http://localhost:4000/vacations/" + item.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "token": sessionStorage.token
            }
        })
            .then(r => r.json())
            .then(response => {
                console.log("removeItem: resonse = ", response);
            })
    }

    const iconClass = () => {
        if (item.checked) {
            return "followIcon checked";
        } else {
            return "followIcon";
        }
    }

    const getDates = () => {
        let _dateFrom = dateReverse(item.date_from);
        let _dateTo = dateReverse(item.date_to);

        return (
            <div style={{ margin: "0 1em" }}>
                <label>{_dateFrom}</label>
                <i className="space" > - </i>
                <label>{_dateTo}</label>
            </div>
        );
    }

    const dateReverse = (dateStr) => {
        let _date = dateStr.substr(0, item.date_from.indexOf('T'));
        let _parts = _date.split('-'); // ['2020','11','07']
        let _result = _parts[2] + '/' + _parts[1] + '/' + _parts[0];
        return _result;
    }

    return (
        //Card
        <div className="card promoting-card">
            {/* Card content  */}
            <div className="card-body d-flex flex-row">

                {/*Content*/}
                <div>
                    {
                        (role == "admin") ?
                            (
                                <>
                                    <i className="followIcon" onClick={(e) => removeItem()}
                                        dangerouslySetInnerHTML={{ __html: '&#10007' }}></i>
                                    <i className="followIcon2" onClick={() => editItem(item)}
                                        dangerouslySetInnerHTML={{ __html: '&#9998' }}></i>
                                </>
                            )
                            :
                            (

                                <i className={iconClass()} onClick={(e) => toggle(e.target)} vacationid={item.id}
                                    dangerouslySetInnerHTML={{ __html: '&#9786' }}></i>

                            )
                    }
                    <h4 className="card-title font-weight-bold mb-2">{item.destination}</h4>
                    {getDates()}
                    {/*Subtitle*/}
                </div>
            </div>

            {/*Card image*/}
            <div className="view overlay">
                <img className="card-img-top rounded-0" src={item.photo} alt="Card image cap" />
                <a href="#!">
                    <div className="mask rgba-white-slight"></div>
                </a>
            </div>

            {/*Card content*/}
            <div className="card-body">
                <div>
                    {/*Text*/}
                    <h6 className="card-title font-weight-bold mb-2">{item.description}</h6>
                    <p className="cardrice"><i className="far fa-clock pr-2"></i>Price: {item.price}</p>
                </div>
            </div>
            <div className="count">{item.follows}</div>
        </div>
        //Card

    )
}


export default VacationItem