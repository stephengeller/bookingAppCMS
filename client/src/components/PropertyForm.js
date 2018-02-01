import React, { Component} from 'react'
import { Button, Icon } from 'react-materialize';


class PropertyForm extends Component {

    render() {
        return (
            <div className="container">
                <form ref="propertyForm">
                    <div className="input-field col s6">
                        <input id="name" ref="name" type="text" className="validate" />
                        <label htmlFor="name">Property Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input
                            id="location"
                            ref="location"
                            type="text"
                            className="validate"
                        />
                        <label htmlFor="location">Location</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="owner" ref="owner" type="text" className="validate" />
                        <label htmlFor="owner">Owner</label>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <span>Start Date</span>
                            <input
                                id="startDate"
                                ref="startDate"
                                type="date"
                                className="datepicker validate"
                            />
                        </div>
                        <div className="col s6">
                            <span>End Date</span>
                            <input
                                id="endDate"
                                ref="endDate"
                                type="date"
                                className="validate"
                            />
                        </div>
                    </div>
                    <input
                        type="text"
                        ref="phoneNumber"
                        placeholder="Contact Phone Number"
                    />
                    <input type="email" ref="email" placeholder="Contact Email Address" />
                    <Button
                        className="btn waves-effect waves-light"
                        type="submit"
                        onClick={console.log('success!')}
                    >
                        <Icon right>add</Icon>Add Property
                    </Button>
                </form>
                <br />
                <div className="divider" />
            </div>
            )
    }
}


export default PropertyForm