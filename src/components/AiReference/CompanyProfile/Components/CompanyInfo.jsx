import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import CompanyInfo from "../Components/CompanyInfoSection";
import CompanyCultureSection from "../Components/CompanyCultureSection";
import defaultAvatar from "../../../../assets/default.png";
import { useGetProfile, useUpdateCompany } from "../../../../hook/useCompany";
const CompanyInfoSection = ({ labels, user }) => {
  const navigate = useNavigate();
  const [companyProfilePicture, setCompanyProfilePicture] = useState(null);
  const [countries, setCountries] = useState([]);
  const { data: companyProfile = {}, isPending } = useGetProfile(user);
  const [avatar, setAvatar] = useState(
    companyProfile?.profileImageURL || defaultAvatar
  );
  const { mutate: UpdateProfile, isPending: isUpdating } = useUpdateCompany(
    user,
    {
      onSettled: () => setCompanyProfilePicture(null),
    }
  );

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
      setAvatar(companyProfile?.profileImageURL || defaultAvatar);
    }
  }, [companyProfile]);

  const handleEditCulture = () => {
    navigate("/update-culture");
  };

  const handleUpdateProfile = async () => {
    const updatedData = new FormData();
    updatedData.append("name", formData.companyName);
    updatedData.append("country", formData.country);
    updatedData.append("cities", formData.cities);
    updatedData.append("email", formData.email);
    updatedData.append("companyProfilePicture", companyProfilePicture);
    await UpdateProfile(updatedData);
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
        isUpdating={isUpdating}
        avatar={avatar}
        setCompanyProfilePicture={setCompanyProfilePicture}
      />
      <CompanyCultureSection
        labels={labels}
        handleEditCulture={handleEditCulture}
        formData={formData}
        companyProfile={companyProfile}
        selectedCulture={companyProfile.selectedCulture || []}
        handleUpdateProfile={handleUpdateProfile}
        isUpdating={isUpdating}
        companyProfilePicture={companyProfilePicture}
      />
    </div>
  );
};

export default CompanyInfoSection;
