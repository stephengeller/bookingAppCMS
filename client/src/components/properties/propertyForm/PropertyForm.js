import React, { Component } from 'react';
import { Row, Preloader } from 'react-materialize';

import Formatter from '../../../modules/Formatter';
import ErrorHandler from '../../../modules/ErrorHandler';
import GoogleMapsAPI from '../../../modules/GoogleMapsAPI';
import AddPropertyButton from '../../buttons/AddPropertyButton';
import FormSection from './FormSection';

const PropertyFields = require('../../../json/PropertyForm/PropertyFormFields');
const RequiredFields = require('../../../json/PropertyForm/RequiredFields');
const AllFields = require('../../../json/PropertyForm/AllFields');

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
			notice: '',
			loading: false
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
        fieldsToClean.map(fieldName => (this.state.fields[fieldName] = ''));
		this.setState({ fields: this.state.fields, notice });
	}

	submissionInProgress(bool) {
		this.setState({ loading: bool });
	}

	async addProperty() {
	    const {fields} = this.state;
		this.submissionInProgress(true);
		if (
			this.errorHandler.allFieldsAreCompleted(
				this.requiredFields,
				fields
			)
		) {
			const fieldsToSubmit = await this.setUpFieldsObject(fields);
			this.props.apiClient
				.post('/properties/', fieldsToSubmit)
				.then(() => {
					const notice = {
						message: `Property "${fieldsToSubmit.title}" successfully added`,
						style: { color: 'green' }
					};
					this.resetAfterSuccess(this.allFields, notice);
				})
				.catch(error => {
					const errorMessage = {
						message: error.toString(),
						style: { color: 'red' }
					};
					this.submissionInProgress(false);
					this.setState({ notice: errorMessage });
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
				/>
			);
		}
		return form;
	}

	render() {
		const { notice, loading } = this.state;
		return (
			<div className="container">
				<div className="notice" style={notice.style} id="error">
					{notice.message}
				</div>
				{this.buildForm(PropertyFields)}
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
