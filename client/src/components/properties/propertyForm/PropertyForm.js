import React, { Component } from 'react';
import {
	Row,
	Preloader,
	Button,
	Dropdown,
	NavItem
} from 'react-materialize';
import { Modal } from 'react-bootstrap';

import Formatter from '../../../modules/Formatter';
import ErrorHandler from '../../../modules/ErrorHandler';
import GoogleMapsAPI from '../../../modules/GoogleMapsAPI';
import AddPropertyButton from '../../buttons/AddPropertyButton';
import FormSection from './FormSection';
import PropertyFields from "../../../json/PropertyForm/PropertyFormFields";
import RequiredFields from "../../../json/PropertyForm/RequiredFields";
import AllFields from "../../../json/PropertyForm/AllFields";

class PropertyForm extends Component {
	constructor(props) {
		super(props);
		this.addProperty = this.addProperty.bind(this);
		this.updateInputValue = this.updateInputValue.bind(this);
		this.submissionInProgress = this.submissionInProgress.bind(this);
		this.handleMissingFields = this.handleMissingFields.bind(this);
		this.buildForm = this.buildForm.bind(this);
		this.formatter = new Formatter();
		this.errorHandler = new ErrorHandler();
		this.mapsAPI = new GoogleMapsAPI({
			googleApiKey: this.props.googleApiKey
		});
		this.allFields = AllFields;
		this.requiredFields = RequiredFields;

		this.state = {
			fields: {
				location: {}
			},
			notice: {
				show: false
			},
			loading: false,
            roomType: 'Room Type'
		};
	}

	async setUpFieldsObject(fields) {
		const { postcode } = this.state.fields;
		const lngLat = await this.mapsAPI.getPostcodeResults(postcode);
		const { title, description, bookingEmail } = fields;
		return {
			title,
			description,
			location: {
				lat: lngLat.latitude,
				lon: lngLat.longitude
			},
			facilities: this.formatter.formatItemStringToArray(fields.facilities),
			address: await this.formatter.convertAddressToArray(fields),
			ownerId: 'testOwnerId',
			bookingEmail
		};
	}

	resetAfterSuccess(fieldsToClean, notice) {
		this.submissionInProgress(false);
		const { fields } = this.state;
		fieldsToClean.map(fieldName => (fields[fieldName] = ''));
		this.setState({ fields, notice });
	}

	submissionInProgress(bool) {
		this.setState({ loading: bool });
	}

	async addProperty() {
		const { fields } = this.state;
		this.submissionInProgress(true);
		if (this.errorHandler.allFieldsAreCompleted(this.requiredFields, fields)) {
			const fieldsToSubmit = await this.setUpFieldsObject(fields);
			this.props.apiClient
				.post('/properties/', fieldsToSubmit)
				.then(() => {
					const notice = {
						message: `Property "${fieldsToSubmit.title}" successfully added`,
						style: { color: 'green' },
						show: true
					};
					this.resetAfterSuccess(this.allFields, notice);
				})
				.catch(error => {
					const notice = {
						message: error.toString(),
						style: { color: 'red' },
						show: true
					};
					this.submissionInProgress(false);
					this.setState({ notice });
				});
		} else {
			this.handleMissingFields();
		}
	}

	handleMissingFields() {
		const notice = this.errorHandler.emptyBoxErrorHandler(
			this.requiredFields,
			this.state
		);
		notice.show = true;
		this.submissionInProgress(false);
		this.setState({ notice });
	}

	updateInputValue(evt, formName) {
		let value = evt.target.value.toString();
		let { fields } = this.state;
		fields[formName] = value;
		this.setState({
			fields
		});
	}

	buildForm(fields) {
		const form = [];
		const keys = Object.keys(fields);
		for (let section in keys) {
			const sectionFields = fields[keys[section]];
			form.push(
				<FormSection
					name={keys[section]}
					fields={sectionFields}
					value={this.state.fields}
					updateInputValue={this.updateInputValue}
					key={section}
				/>
			);
		}
		return form;
	}

	handleDropdown = (e) => {
	    const choice = e.target.innerHTML;
		this.setState({roomType: choice})
	};

	render() {
		const { notice, loading } = this.state;
		const options = ['A', 'B', 'C'];
		return (
			<div className="container">
				<Modal
					show={notice.show}
					style={notice.style}
					id="notice"
					className="center"
				>
					<Modal.Header>
						<Modal.Title>{'Notice'}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{notice.message}</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => this.setState({ notice: { show: false } })}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
				{this.buildForm(PropertyFields)}
				<div>
                    <Dropdown className={'room-type-dropdown'} trigger={
                        <Button>{this.state.roomType}</Button>
                    }>
                        {options.map((o) => <NavItem key={o} onClick={this.handleDropdown}>Type {o}</NavItem>)}
                    </Dropdown>
				</div>
				<br />
				{loading === false ? (
					<Row>
						<AddPropertyButton addProperty={this.addProperty} />
						<br />
					</Row>
				) : (
					<Preloader />
				)}
			</div>
		);
	}
}

export default PropertyForm;
