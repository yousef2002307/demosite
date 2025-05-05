import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

import { faMapMarkerAlt, faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./MaintenanceBooking.css";
import Header1 from "@/components/headers/Header1";
import Header2 from "@/components/headers/Header2";
import Header3 from "@/components/headers/Header3";
import Header4 from "@/components/headers/Header4";
import Footer1 from "@/components/footers/Footer1";
import DropdownSelect from "@/components/common/DropDownSelect";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
const months = [ "May", "June", "July", "August",'September'];

// Month to number mapping for date calculations
const monthToNumber = {
   // 0-indexed, so April is 3
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
};

const getPreviousMonth = (currentMonth) => {
  const currentIndex = months.indexOf(currentMonth);
  return currentIndex > 0
    ? months[currentIndex - 1]
    : months[months.length - 1];
};

const getNextMonth = (currentMonth) => {
  const currentIndex = months.indexOf(currentMonth);
  return currentIndex < months.length - 1
    ? months[currentIndex + 1]
    : months[0];
};

// Get the number of days in a month for a specific year
const getDaysInMonth = (month, year) => {
  // monthToNumber has 0-indexed months, but Date constructor needs 0-indexed months
  return new Date(year, monthToNumber[month] + 1, 0).getDate();
};

// Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
const getFirstDayOfMonth = (month, year) => {
  const firstDay = new Date(year, monthToNumber[month], 1).getDay();
  // Convert Sunday (0) to be 7 to match European calendar format (Monday first)
  return firstDay === 0 ? 7 : firstDay;
};

// Generate available days for a given month (example: weekends are disabled)
const getAvailableDays = (month) => {
  // This is just an example - you can replace with your actual logic
  const daysInMonth = getDaysInMonth(month, 2025);
  const availableDays = [];

  for (let i = 1; i <= daysInMonth; i++) {
    // Example: Check if the day is a weekend (this is based on April 2025)
    const dayOfWeek = new Date(2025, monthToNumber[month], i).getDay();
    // Disable weekends (0 is Sunday, 6 is Saturday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      availableDays.push(i);
    }
  }

  return availableDays;
};

export default function MaintenanceBooking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [openSections, setOpenSections] = useState({});

// Add this toggle function
  const [formData, setFormData] = useState({
    // Vehicle Info
    licensePlate: "",
    mileage: "",
    leaseType: "",
    month: "July",
    // Form Validation
    errors: {},
    // Branch
    branch: "",
    branchAddress: "",
    branchPostalCode: "",
    branchCity: "",
    branchImage: "",

    // Services
    mainService: "Maintenance according to service indication", // Set first service as default
    serviceDescription: "", // Added for service descriptions
    extraServices: [],
    waitAtBranch: true,

    // Date & Time
    appointmentDate: "",
    appointmentTime: "",

    // Contact Info
    companyName: "",
    leaseCompany: "",
    contactTitle: "",
    contactName: "",
    phone: "",
    email: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    brand: "",
    model: "",
    Ruit: {
      Ruitvervanging: false,
      Sterretje: false,
    },
  });

  const handleLicensePlateBlur = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    const formattedValue = value.match(/.{1,2}/g)?.join('-') || value;
    setFormData((prev) => ({
      ...prev,
      licensePlate: formattedValue,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStepClick = (newStep) => {
    if (newStep  <= step  ) {
      setStep(newStep);
    }
  };

const toggleSection = (section) => {
  setOpenSections(prev => ({
    ...prev,
    [section]: !prev[section]
  }));
};
  const handleNext = () => {
    let canProceed = true;
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.licensePlate) {
          newErrors.licensePlate = 'License plate is required';
          canProceed = false;
        }
        if (!formData.brand) {
          newErrors.brand = 'Brand is required';
          canProceed = false;
        }
        if (!formData.model) {
          newErrors.model = 'Model is required';
          canProceed = false;
        }
        if (!formData.mileage) {
          newErrors.mileage = 'Mileage is required';
          canProceed = false;
        }
        break;
      case 2:
        if (!formData.branch) {
          newErrors.branch = 'Please select a branch';
          canProceed = false;
        }
        break;
      case 3:
        if (!formData.mainService) {
          newErrors.mainService = 'Please select a service';
          canProceed = false;
        }
        break;
      case 4:
        if (!formData.appointmentDate) {
          newErrors.appointmentDate = 'Please select an appointment date';
          canProceed = false;
          alert('Please select an appointment date');
        }
        if (!formData.appointmentTime) {
          newErrors.appointmentTime = 'Please select an appointment time';
          canProceed = false;
          alert('Please select an appointment time');
        }
        break;
      default:
        canProceed = true;
    }

    setFormData(prev => ({
      ...prev,
      errors: newErrors
    }));

    if (canProceed) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const requestData = {
        plate_number: formData.licensePlate.replace(/-/g, ''), 
        brand: formData.brand,
        model: formData.model,
        model_year: 2025, // You may want to add a year field to your form
        kilometers: parseInt(formData.mileage),
        renting_car: formData.leaseType === "Privé lease" ? "Private Leasing" : 
                    formData.leaseType === "Zakelijke lease" ? "Business Leasing" : "No",
        required_maintenance: formData.mainService === "Maintenance according to service indication" ? "Maintenance according to service indicator" :
                             formData.mainService === "Maintenance and fault/diagnosis" ? "Maintenance and diagnosis" :
                             "Malfunction or diagnosis",
        booking_date: formData.appointmentDate,
        booking_time: formData.appointmentTime
      };

      const response = await axios.post(
        'https://develop.sayarti.nl/api/v1/en/maintenance-booking',
        requestData,
        {
          headers: {
            'Authorization': 'Bearer 307|75C3Zi9h5tCsyetDjVOXu7JJtVSBE59vufSh54bi9f87403a', // Token will be added manually
            'Content-Type': 'application/json'
          }
        }
      );

      alert('Appointment booked successfully!');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred while booking the appointment');
    }
  };

  const handleBranchSelect = (branchName, address, postalCode, city, imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      branch: branchName,
      branchAddress: address,
      branchPostalCode: postalCode,
      branchCity: city,
      branchImage: imageUrl,
    }));
    setStep((prev) => prev + 1);
  };

  const handleServiceSelect = (service) => {
    setFormData((prev) => ({
      ...prev,
      mainService: prev.mainService === service ? "" : service,
      errors: {
        ...prev.errors,
        mainService: null // Clear the error when a service is selected
      }
    }));
  };

  const handleExtraServiceToggle = (service) => {
    setFormData((prev) => {
      const services = [...prev.extraServices];
      const index = services.indexOf(service);
      if (index === -1) {
        services.push(service);
      } else {
        services.splice(index, 1);
      }
      return {
        ...prev,
        extraServices: services,
      };
    });
  };

  // maping of branch names to their respective images
  const branchsData = [
    {
      branchName: "Wittebrug Delft",
      branchAddress: "ENERGIEWEG 5",
      branchPostalCode: "2627 AP",
      branchCity: "DELFT",
      imageUrl: "/assets/images/car-list/car1.jpg",
    },
    {
      branchName: "Wittebrug Rotterdam",
      branchAddress: "ENERGIEWEG 5",
      branchPostalCode: "2627 AP",
      branchCity: "DELFT",
      imageUrl: "/assets/images/car-list/car2.jpg",
    },
    {
      branchName: "Wittebrug Den Haag",
      branchAddress: "ENERGIEWEG 5",
      branchPostalCode: "2627 AP",
      branchCity: "DELFT",
      imageUrl: "/assets/images/car-list/car3.jpg",
    },
    {
      branchName: "Wittebrug Utrecht",
      branchAddress: "ENERGIEWEG 5",
      branchPostalCode: "2627 AP",
      branchCity: "DELFT",
      imageUrl: "/assets/images/car-list/car4.jpg",
    },
  ];

  const servicesMainData = [
    {
      serviceName: "Maintenance according to service indication",
      serviceDescription: "Make a choice from the services below.",
      serviceImage: "/assets/images/icon-box/carIcon.png",
    },
    {
      serviceName: "Maintenance and fault/diagnosis",
      serviceDescription: "Make a choice from the services below.",
      serviceImage: "/assets/images/icon-box/carIcon.png",
    },
    {
      serviceName: "Fault or diagnosis",
      serviceDescription: "Make a choice from the services below.",
      serviceImage: "/assets/images/icon-box/carIcon.png",
    },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h2>Plan your workshop appointment</h2>
            <div className="form-group">
              <label>I don't know my license plate</label>
              <div className="license-plate-container justify-content-start mt-3">
                <div className="license-plate">
                  <div className="country-flag">NL</div>
                  <input
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleInputChange}
                    onBlur={handleLicensePlateBlur}
                    placeholder="Enter License Plate"
                    className={`plate-input ${formData.errors.licensePlate ? 'is-invalid' : ''}`}
                  />
                </div>
                <button className="check-button">CHECK</button>
              </div>
              {formData.errors.licensePlate && (
                <div className="error-message">{formData.errors.licensePlate}</div>
              )}
            </div>

            <div className="form-group">
              <label>Merk *</label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className={`brand-input ${formData.errors.brand ? 'is-invalid' : ''}`}
              >
                <option value="">Select a brand</option>
                <option value="AUDI">AUDI</option>
                <option value="CUPRA">CUPRA</option>
                <option value="SEAT">SEAT</option>
                <option value="SKODA">SKODA</option>
                <option value="VOLKSWAGEN">VOLKSWAGEN</option>
                <option value="VW BEDRIJFSWAGENS">VW BEDRIJFSWAGENS</option>
              </select>
              {formData.errors.brand && (
                <div className="error-message">{formData.errors.brand}</div>
              )}
            </div>

            <div className="form-group">
              <label>Type *</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="wowd"
                className={`model-input ${formData.errors.model ? 'is-invalid' : ''}`}
              />
              {formData.errors.model && (
                <div className="error-message">{formData.errors.model}</div>
              )}
            </div>

            <div className="form-group">
              <label>Kilometerstand *</label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                placeholder="12"
                className={`mileage-input ${formData.errors.mileage ? 'is-invalid' : ''}`}
              />
              {formData.errors.mileage && (
                <div className="error-message">{formData.errors.mileage}</div>
              )}
            </div>

            <div className="form-group">
              <label>Maakt u gebruik van een leaseauto?</label>
              <div className="group-select">
                <DropdownSelect
                  name="leaseType"
                  value={formData.leaseType}
                  onChange={(value) =>
                    handleInputChange({ target: { name: "leaseType", value } })
                  }
                  options={["Privé lease", "Zakelijke lease", "Nee"]}
                  addtionalParentClass="form-control"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h2>Choose a Branch</h2>
            <p>Select the branch where you want to make an appointment.</p>{" "}
            <div className="branch-filter">
              <p>Choose a brand from the list to filter branches by brand.</p>
              <div className="group-select branchselect">
                <DropdownSelect
                  name="brand"
                  selectedValue={formData.brand}
                  onChange={(value) =>
                    handleInputChange({ target: { name: "brand", value } })
                  }
                  options={[
                    "AUDI",
                    "CUPRA",
                    "SEAT",
                    "SKODA",
                    "VOLKSWAGEN",
                    "VW BEDRIJFSWAGENS",
                  ]}
                  addtionalParentClass="brand-select"
                />
              </div>
            </div>
            <p>Select a branch</p>
            <div className="branches-grid">
              {branchsData.map((branch) => (
                <div
                  key={branch.branchName}
                  className={`branch-card ${
                    formData.branch === branch.branchName ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleBranchSelect(
                      branch.branchName,
                      branch.branchAddress,
                      branch.branchPostalCode,
                      branch.branchCity,
                      branch.imageUrl
                    )
                  }
                >
                  <div className="branch-image">
                    <img
                      src={branch.imageUrl}
                      alt={branch.branchName}
                      className="branch-image-img"
                    />
                  </div>
                  <div className="branch-info">
                    <h3>{branch.branchName}</h3>
                    <p>{branch.branchAddress}</p>
                    <p>
                      {branch.branchPostalCode} {branch.branchCity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h2>Select the desired services</h2>
            <p className="service-description mb-2">
              Make a choice from the services below.
          
            {formData.errors.mainService && (
            <div className="error-message mb-3" style={{color: 'red'}}>
            {formData.errors.mainService}
            </div>
            )}
              </p>
              
            <div className="services-main">
              {servicesMainData.map((service) => (
                <div
                  key={service.serviceName}
                  className={`service-card ${formData.mainService === service.serviceName ? "selected" : ""}`}
                  onClick={() => handleServiceSelect(service.serviceName)}
                >
                  <h3 className="service-title ">{service.serviceName}</h3>
                  <div className="icon">
                    <img
                      src={service.serviceImage}
                      alt={service.serviceName}
                      className="icon-img w-8 h-8"
                    />
                  </div>
                  {(service.serviceName === "Maintenance and fault/diagnosis" || 
                    service.serviceName === "Fault or diagnosis") && 
                    formData.mainService === service.serviceName && (
                    <div className="service-description-input mt-3 w-100">
                    
                    </div>
                  )}
                </div>
              ))}
            </div>

            {(formData.mainService === "Maintenance and fault/diagnosis" || 
              formData.mainService === "Fault or diagnosis") && (
              <div className="general-service-description mt-4 mb-4">
                <h4>Additional Notes</h4>
                <textarea 
                  name="generalServiceDescription"
                  value={formData.generalServiceDescription || ''}
                  onChange={handleInputChange}
                  placeholder="Please provide any additional information about your service needs..."
                  className="form-control generalServiceDescription"
                  rows="4"
                />
              </div>
            )}

            <div className="extra-services">
              <h3>Additional Services</h3>

              {/* Vehicle Inspection (APK) */}
              <div className="expandable-section">
                <div className="section-header">
                  <h3>Vehicle Inspection (APK)</h3>
                  <div className="d-flex justify-content-between gap-5 align-items-center">
                    <div className="service-price font-weight-bold fs-6">
                      €64.00
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Reparatie- of herstelwerkzaamheden */}
              <div className="expandable-section">
                <div className="section-header">
                  <h3>Reparatie- of herstelwerkzaamheden</h3>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={formData.extraServices.includes("procedure")}
                      onChange={() => handleExtraServiceToggle("procedure")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                {formData.extraServices.includes("procedure") && (
                  <div className="section-content">
                    <div className="service-item">
                      <textarea
                        type="text"
                        name="textArea"
                        value={formData.textArea}
                        onChange={handleInputChange}
                        placeholder="Please provide details about the repair or restoration work needed."
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigatie update */}
              <div className="expandable-section">
                <div className="section-header">
                  <h3>Navigatie update</h3>
                  <div className="d-flex justify-content-between gap-5 align-items-center">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Zomercheck-/Wintercheck- of Welkomstcheck */}

              <div className="expandable-section">
                <div className="section-header">
                  <h3>Zomercheck-/Wintercheck- of Welkomstcheck</h3>
                  <div className="d-flex justify-content-between gap-5 align-items-center">
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Banden */}

              <div className="expandable-section">
              <div className="section-header" onClick={() => toggleSection('banden')}>
    <h3>Banden</h3>
    <div className="toggle-indicator">
      <FontAwesomeIcon 
        icon={openSections.banden ? faChevronUp : faChevronDown } 
        className={openSections.banden ? "open" : ""}
      />
    </div>
  </div>
  {openSections.banden && (
                <div className="section-content d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between gap-5 align-items-center">
                    <span>Bandenwissel los (zonder velgen)</span>
                    <div className="d-flex justify-content-between gap-5 align-items-center">
                      <span>€185.00</span>
                      <div className="d-flex justify-content-between gap-5 align-items-center">
                        <label className="toggle-switch">
                          <input type="checkbox" />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between gap-5 align-items-center">
                    <span>Bandenwissel set (banden + velgen)</span>
                    <div className="d-flex justify-content-between gap-5 align-items-center">
                      <span>€185.00</span>
                      <div className="d-flex justify-content-between gap-5 align-items-center">
                        <label className="toggle-switch">
                          <input type="checkbox" />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between gap-5 align-items-center">
                    <span>
                      Bandenwissel uitsluitend in combinatie met andere
                      werkzaamheden
                    </span>
                    <div className="d-flex justify-content-between gap-5 align-items-center">
                      <div className="d-flex justify-content-between gap-5 align-items-center">
                        <label className="toggle-switch">
                          <input type="checkbox" />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                  )}
              </div>
              {/* Ruit*/}
              <div className="expandable-section">
              <div className="section-header" onClick={() => toggleSection('ruit')}>
    <h3>Ruit</h3>
    <div className="toggle-indicator">
      <FontAwesomeIcon 
         icon={openSections.ruit ? faChevronUp : faChevronDown } 
        className={openSections.ruit ? "open" : ""}
      />
    </div>
  </div>

                <div className={`section-content d-flex flex-column gap-3 ${openSections.ruit ? "d-none" : ""}`}>
  
                  <div className="">
                    <div className="d-flex justify-content-between gap-5 align-items-center">
                      <span>Bandenwissel los (zonder velgen)</span>
                      <div className="d-flex justify-content-between gap-5 align-items-center">
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={formData.Ruit.Ruitvervanging}
                            onChange={() =>
                              setFormData((prev) => ({
                                ...prev,
                                Ruit: {
                                  ...prev.Ruit,
                                  Ruitvervanging: !prev.Ruit.Ruitvervanging,
                                },
                              }))
                            }
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                    
                    {/* textarea */}
                    {formData.Ruit.Ruitvervanging && (
                          <div className={`section-content  ${openSections.ruit ? "d-none" : ""}`}>
                        <div className="service-item">
                          <textarea
                            type="text"
                            name="textArea"
                            value={formData.textArea}
                            onChange={handleInputChange}
                            placeholder="Please provide details about the repair or restoration work needed."
                          ></textarea>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`section-content d-flex flex-column gap-3 ${openSections.ruit ? "d-none" : ""}`}>
                  <div className="">
                    <div className="d-flex justify-content-between gap-5 align-items-center">
                      <span>Sterretje repareren (kleiner dan 2 cm)</span>
                      <div className="d-flex justify-content-between gap-5 align-items-center">
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={formData.Ruit.Sterretje}
                            onChange={() =>
                              setFormData((prev) => ({
                                ...prev,
                                Ruit: {
                                  ...prev.Ruit,
                                  Sterretje: !prev.Ruit.Sterretje,
                                },
                              }))
                            }
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                    {/* textarea */}
                    {formData.Ruit.Sterretje && (
                      <div className="section-content">
                        <div className="service-item">
                          <textarea
                            type="text"
                            name="textArea"
                            value={formData.textArea}
                            onChange={handleInputChange}
                            placeholder="Please provide details about the repair or restoration work needed."
                          ></textarea>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Airco */}

              <div className="expandable-section">
              <div className="section-header" onClick={() => toggleSection('airco')}>
    <h3>Airco</h3>
    <div className="toggle-indicator">
      <FontAwesomeIcon 
     
        icon={openSections.airco ? faChevronUp : faChevronDown } 
        className={openSections.airco ? "open" : ""}
      />
    </div>
  </div>

  <div className={`section-content d-flex flex-column gap-3 ${openSections.airco ? "d-none" : ""}`}>
                  <div className="d-flex justify-content-between gap-5 align-items-center">
                    <span>Aircocheck</span>
                    <div className="d-flex justify-content-between gap-5 align-items-center">
                      <div className="d-flex justify-content-between gap-5 align-items-center">
                        <label className="toggle-switch">
                          <input type="checkbox" />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between gap-5 align-items-center">
                    <span>Airco onderhoudsbeurt</span>
                    <div className="d-flex justify-content-between gap-5 align-items-center">
                      <div className="d-flex justify-content-between gap-5 align-items-center">
                        <label className="toggle-switch">
                          <input type="checkbox" />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="waiting-options">
              <div
                className={`waiting-option ${
                  formData.waitAtBranch ? "selected" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, waitAtBranch: true }))
                }
              >
                 <div className="radio-input">
                  <input
                    type="radio"
                    id="wait-yes"
                    name="waiting"
                    checked={formData.waitAtBranch}
                    readOnly
                  />
                  <label className="labell" htmlFor="wait-yes"></label>
                </div>
                
                <span>Yes</span>
                <div className="icon">
                  <img className="labellimg" src = "/assets/images/icon-box/coffee.png" alt="clock" />
                </div>
              </div>
              <div
                className={`waiting-option ${
                  !formData.waitAtBranch ? "selected" : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, waitAtBranch: false }))
                }
              >
                <div className="radio-input">
                  <input
                    type="radio"
                    id="wait-no"
                    name="waiting"
                    checked={!formData.waitAtBranch}
                    readOnly
                  />
                  <label className="labell" htmlFor="wait-no"></label>
                </div>
              
                <span>No</span>
                <div className="icon">
                  <img className="labellimg" src = "/assets/images/icon-box/run.png" alt="clock" />
                </div>
              </div>
            </div>
          </div>
        );


      case 4:
        return (
          <div className="form-step">
            <h2 className="date">Date</h2>{" "}
            <div className="month-tabs">
              {months.map((monthName, index) => (
                <div
                  key={index}
                  className={`month-tab ${
                    formData.month === monthName ? "active" : ""
                  }`}
                  onClick={() =>
                    handleInputChange({
                      target: { name: "month", value: monthName },
                    })
                  }
                >
                  <span>
                    {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
                  </span>
                </div>
              ))}
            </div>
            <div className="date-divider">
          
            <div className="time-slots">
            <h3>What time?</h3>
            <div className="buttons">
              <button
                type="button"
                onClick={() =>
                  handleInputChange({
                    target: { name: "appointmentTime", value: "10:15" },
                  })
                }
                className={`time-slot-btn ${
                  formData.appointmentTime === "10:15" ? "active" : ""
                }`}
              >
                10:15
              </button>
              <button
                type="button"
                onClick={() =>
                  handleInputChange({
                    target: { name: "appointmentTime", value: "13:00" },
                  })
                }
                className={`time-slot-btn ${
                  formData.appointmentTime === "13:00" ? "active" : ""
                }`}
              >
                13:00
              </button>
              <button
                type="button"
                onClick={() =>
                  handleInputChange({
                    target: { name: "appointmentTime", value: "15:15" },
                  })
                }
                className={`time-slot-btn ${
                  formData.appointmentTime === "15:15" ? "active" : ""
                }`}
              >
                15:15
              </button>
              </div>
            </div>
            <div className="date-picker">
              <div className="month-selector">
                <button
                  type="button"
                  className="month-nav-btn"
                  onClick={() =>
                    handleInputChange({
                      target: {
                        name: "month",
                        value: getPreviousMonth(formData.month),
                      },
                    })
                  }
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <span className="current-month">
                  {formData.month.charAt(0).toUpperCase() +
                    formData.month.slice(1)}{" "}
                  2025
                </span>
                <button
                  type="button"
                  className="month-nav-btn"
                  onClick={() =>
                    handleInputChange({
                      target: {
                        name: "month",
                        value: getNextMonth(formData.month),
                      },
                    })
                  }
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>{" "}
              <div className="calendar">
                <div className="weekday">Ma</div>
                <div className="weekday">Di</div>
                <div className="weekday">Wo</div>
                <div className="weekday">Do</div>
                <div className="weekday">Vr</div>
                <div className="weekday">Za</div>
                <div className="weekday">Zo</div>

                {/* Calculate empty cells before the first day of the month */}
                {Array.from(
                  { length: getFirstDayOfMonth(formData.month, 2025) - 1 },
                  (_, i) => (
                    <div key={`empty-${i}`} className="day empty"></div>
                  )
                )}

                {/* Generate the actual days of the month */}
                {Array.from(
                  { length: getDaysInMonth(formData.month, 2025) },
                  (_, i) => {
                    const day = i + 1;
                    const availableDays = getAvailableDays(formData.month);
                    const isAvailable = availableDays.includes(day);

                    return (
                      <div
                        key={day}
                        className={`day ${
                          formData.appointmentDate && new Date(formData.appointmentDate).getDate() === day
                            ? "selected"
                            : ""
                        } ${!isAvailable ? "disabled" : ""}`}
                        onClick={() => {
                          if (isAvailable) {
                            const month = monthToNumber[formData.month] + 1;
                            const formattedMonth = month.toString().padStart(2, '0');
                            const formattedDay = day.toString().padStart(2, '0');
                            const fullDate = `2025-${formattedMonth}-${formattedDay}`;
                            handleInputChange({
                              target: {
                                name: "appointmentDate",
                                value: fullDate,
                              },
                            });
                          }
                        }
                        }
                      >
                        {day}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            </div>
            {/* Display selected date and time */}
            {(formData.appointmentDate || formData.appointmentTime) && (
              <div className="selected-datetime">
                <h4>Selected Appointment:</h4>
                <div className="datetime-details">
                  {formData.appointmentDate && (
                    <p>
                      <strong>Date:</strong> {formData.appointmentDate ? new Date(formData.appointmentDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                    </p>
                  )}
                  {formData.appointmentTime && (
                    <p>
                      <strong>Time:</strong> {formData.appointmentTime}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="form-step">
            <h2>Uw contactgegevens</h2>
            <p className="form-description">
              U kunt uw contactgegevens invullen in de onderstaande velden. Na
              het invullen van uw gegevens kunt u met de button versturen de
              afspraak definitief inplannen.
            </p>

            <div className="contact-form-grid">
              {/* Left Column */}
              <div className="form-column">
                <div className="form-group">
                  <div className="input-with-icon">
                    <i className="fas fa-building"></i>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Bedrijfsnaam"
                      className="optional-field"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      name="contactTitle"
                      value={formData.contactTitle}
                      onChange={handleInputChange}
                      placeholder="Aanhef"
                      className="optional-field"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <i className="fas fa-phone"></i>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Telefoon *"
                      className="required-field"
                      required
                    />
                  </div>
                  {!formData.phone && (
                    <span className="error-message">
                      Dit is een verplicht veld.
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email *"
                      className="required-field"
                      required
                    />
                  </div>
                  {!formData.email && (
                    <span className="error-message">
                      Dit is een verplicht veld.
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <i className="fas fa-map-marker-alt"></i>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="Postcode *"
                      className="required-field"
                      required
                    />
                  </div>
                  {!formData.postalCode && (
                    <span className="error-message">
                      Dit is een verplicht veld.
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <i className="fas fa-map-marker-alt"></i>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Straat *"
                      className="required-field"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="form-column">
                <div className="form-group">
                  <div className="input-with-icon">
                    <i className="fas fa-building"></i>
                    <input
                      type="text"
                      name="leaseCompany"
                      value={formData.leaseCompany}
                      onChange={handleInputChange}
                      placeholder="Leasemaatschappij"
                      className="optional-field"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="Naam *"
                      className="required-field"
                      required
                    />
                  </div>
                  {!formData.contactName && (
                    <span className="error-message">
                      Dit is een verplicht veld.
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <i className="fas fa-map-marker-alt"></i>
                    <input
                      type="text"
                      name="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleInputChange}
                      placeholder="Huisnr *"
                      className="required-field"
                      required
                    />
                  </div>
                  {!formData.houseNumber && (
                    <span className="error-message">
                      Dit is een verplicht veld.
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <i className="fas fa-map-marker-alt"></i>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Plaats *"
                      className="required-field"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <h2>Summary</h2>
            <div className="summary-section">
         
              <div className="summary-container">
                {/* Vehicle Info */}
                <div className="summary-group vh">
                  <h3>Vehicle Information</h3>
                  <div className="alaba">
                    <div>
                  <div className="summary-item vhitem">
                    <span className="label">Nl</span>
                    <span className="value">
                      {formData.licensePlate || "Not specified"}
                    </span>
                  </div>
                  </div>
                  <div >
                  <div className="summary-item">
                    <span className="label">Brand:</span>
                    <span className="value">
                      {formData.brand || "Not specified"}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Model:</span>
                    <span className="value">
                      {formData.model || "Not specified"}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Mileage:</span>
                    <span className="value">
                      {formData.mileage || "Not specified"}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Lease Type:</span>
                    <span className="value">
                      {formData.leaseType || "Not specified"}
                    </span>
                  </div>
                  </div>
                  </div>
                </div>

                {/* Branch Info */}
                <div className="summary-group">
                  <h3>Branch Information</h3>
                  <div className="branch-con">
                  <div className="summary-item">
                   <img src={formData.branchImage} alt="Branch Image" />
                  
                  </div>
                  <div className="summary-item">
                 <h3 class="h-branch">
                      {formData.branch || "Not specified"}
                    </h3>
                    
                    <p>
                      {formData.branchAddress || "Not specified"}
                    </p>
                   
                    <p>
                      {formData.branchCity || "Not specified"}
                    </p>
                  </div>
                </div>
                </div>

                {/* Services Info */}
                <div className="summary-group">
                  <h3>Selected Services</h3>
                  <div className="summary-item">
                    <span className="label">Main Service:</span>
                    <span className="value">
                      {formData.mainService || "Not specified"}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Additional Services:</span>
                    <span className="value">
                      {formData.extraServices.length > 0
                        ? formData.extraServices.join(", ")
                        : "None"}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Wait at Branch:</span>
                    <span className="value">
                      {formData.waitAtBranch ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                {/* Appointment Info */}
                <div className="summary-group">
                  <h3>Appointment Details</h3>
                  <div className="summary-item">
                    <span className="label">Date:</span>
                    <span className="value">
                      {formData.appointmentDate
                        ? `${formData.appointmentDate} ${formData.month} 2025`
                        : "Not specified"}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Time:</span>
                    <span className="value">
                      {formData.appointmentTime || "Not specified"}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="summary-group">
                  <h3>Contact Information</h3>
                  <div className="summary-item">
                    <span className="label">Name:</span>
                    <span className="value">
                      {formData.contactName || "Not specified"}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Company:</span>
                    <span className="value">
                      {formData.companyName || "Not specified"}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Email:</span>
                    <span className="value">
                      {formData.email || "Not specified"}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Phone:</span>
                    <span className="value">
                      {formData.phone || "Not specified"}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Address:</span>
                    <span className="value">
                      {formData.street && formData.houseNumber && formData.city
                        ? `${formData.street} ${formData.houseNumber}, ${formData.city}`
                        : "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="header-fixed">
      <Header4 />
      <div className="maintenance-booking-page">
        <div className="steps-sidebar d-none d-md-block">
          <div className="steps-list">
            <h1 className="WA">Workplace Appoinment</h1>
            <div
              className={`step-item ${step === 1 ? "active" : ""} ${
                step > 1 ? "completed" : ""
              }`}
              onClick={() => handleStepClick(1)}
            >
              <div className="step-number">1</div>
              <div className="step-text">Vehicle details</div>
            </div>
            <div
              className={`step-item ${step === 2 ? "active" : ""} ${
                step > 2 ? "completed" : ""
              }`}
              onClick={() => handleStepClick(2)}
            >
              <div className="step-number">2</div>
              <div className="step-text">Branch</div>
            </div>
            <div
              className={`step-item ${step === 3 ? "active" : ""} ${
                step > 3 ? "completed" : ""
              }`}
              onClick={() => handleStepClick(3)}
            >
              <div className="step-number">3</div>
              <div className="step-text">Services</div>
            </div>
            <div
              className={`step-item ${step === 4 ? "active" : ""} ${
                step > 4 ? "completed" : ""
              }`}
              onClick={() => handleStepClick(4)}
            >
              <div className="step-number">4</div>
              <div className="step-text">Date</div>
            </div>
            <div
              className={`step-item ${step === 5 ? "active" : ""} ${
                step > 5 ? "completed" : ""
              }`}
              onClick={() => handleStepClick(5)}
            >
              <div className="step-number">5</div>
              <div className="step-text">Details</div>
            </div>
          </div>
          <div className="tri1"></div>
         
        </div>

        <div className="main-content">
          <div className="booking-header">
            <h1>Workshop Appointment</h1>
          </div>

          <form onSubmit={handleSubmit} className="booking-form w-70">
            {renderStep()}

            <div className="form-navigation">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="btn-prev"
                >
                  Previous
                </button>
              )}
              {step < 5 ? (
                <button type="button" onClick={handleNext} className="btn-next">
                  Next <FontAwesomeIcon icon={faArrowRight} />
                </button>
              ) : (
                <button type="submit" className="btn-submit">
                  Make Appointment
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
