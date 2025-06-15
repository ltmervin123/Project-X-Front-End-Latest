import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import CompanyInfo from "../Components/CompanyInfoSection";
import CompanyCultureSection from "../Components/CompanyCultureSection";
import defaultAvatar from "../../../../assets/default.png";
import { useGetProfile } from "../../../../hook/useCompany";
const CompanyInfoSection = ({ labels, user }) => {
  const navigate = useNavigate();
  const { data: companyProfile = {}, isPending } = useGetProfile(user);
  const [avatar, setAvatar] = useState(
    companyProfile?.profileImageURL || defaultAvatar
  );
  const [countries, setCountries] = useState([]);

  const [formData, setFormData] = useState({
    companyName: companyProfile?.name || "",
    country: companyProfile?.country || "",
    cities: companyProfile?.cities || "",
    email: companyProfile?.email || "",
  });

  useEffect(() => {
    if (companyProfile) {
      setFormData({
        companyName: companyProfile.name,
        country: companyProfile.country,
        cities: companyProfile.cities,
        email: companyProfile.email,
      });
    }
  }, [companyProfile]);

  const handleEditCulture = () => {
    navigate("/update-culture");
  };

  return (
    <div id="company-info">
      <CompanyInfo
        labels={labels}
        setCountries={setCountries}
        setFormData={setFormData}
        formData={formData}
        setAvatar={setAvatar}
        countries={countries}
        avatar={avatar}
      />
      <CompanyCultureSection
        labels={labels}
        handleEditCulture={handleEditCulture}
        formData={formData}
        avatar={avatar}
        companyProfile={companyProfile}
        selectedCulture={companyProfile.selectedCulture || []}
        defaultAvatar={defaultAvatar}
      />
    </div>
  );
};

export default CompanyInfoSection;
