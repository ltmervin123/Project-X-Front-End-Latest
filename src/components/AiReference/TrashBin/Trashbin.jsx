import React, { useState, useEffect, useRef, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import JobTable from "./components/JobTable";
import ApplicantTable from "./components/ApplicantTable";
import ReferenceRequestTable from "./components/ReferenceRequestTable";
import ReferenceQuestionTable from "./components/ReferenceQuestionTable";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmationJobPopUp from "./PopUpComponents/DeletePopup/DeleteConfirmationJobPopUp";
import DeleteConfirmationApplicantPopUp from "./PopUpComponents/DeletePopup/DeleteConfirmationApplicantPopUp";
import DeleteConfirmationReferenceRequestPopUp from "./PopUpComponents/DeletePopup/DeleteConfirmationReferenceRequestPopUp";
import DeleteConfirmationReferenceQuestionPopUp from "./PopUpComponents/DeletePopup/DeleteConfirmationReferenceQuestionPopUp";
import RecoverConfirmationJobPopUp from "./PopUpComponents/RecoverPopup/RecoverConfirmationJobPopUp";
import RecoverConfirmationApplicantPopUp from "./PopUpComponents/RecoverPopup/RecoverConfirmationApplicantPopUp";
import RecoverConfirmationReferenceRequestPopUp from "./PopUpComponents/RecoverPopup/RecoverConfirmationReferenceRequestPopUp";
import RecoverConfirmationReferenceQuestionPopUp from "./PopUpComponents/RecoverPopup/RecoverConfirmationReferenceQuestionPopUp";
import PopupGuide from "../../AiReference/PopupGuide";
import { getArchiveReferenceQuestion } from "../../../api/ai-reference/archive/reference-question-api.js";
import { deleteReferenceQuestion } from "../../../api/ai-reference/archive/reference-question-api.js";
import { restoreReferenceQuestion } from "../../../api/ai-reference/archive/reference-question-api.js";

const Trashbin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Job");
  const [isSearchAndButtonsVisible, setIsSearchAndButtonsVisible] =
    useState(false);
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectButtonState, setSelectButtonState] = useState("Select");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showRecoverPopup, setShowRecoverPopup] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const jobButtonRef = useRef(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsSearchAndButtonsVisible(true), 100),
      setTimeout(() => setIsContainerVisible(true), 500),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const {
    data: referenceQuestion,
    isLoading: isLoadingReferenceQuestion,
    isError: isErrorReferenceQuestion,
  } = useQuery({
    queryKey: ["archivedReferenceQuestions"],
    queryFn: getArchiveReferenceQuestion,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { mutate: deleteQuestions, isLoading: isDeletingReferenceQuestions } =
    useMutation({
      mutationFn: deleteReferenceQuestion,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceQuestions"],
        });
        setShowDeletePopup(false);
      },
    });

  const { mutate: restoreQuestion, isLoading: isRecoveringReferenceQuestions } =
    useMutation({
      mutationFn: restoreReferenceQuestion,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceQuestions"],
        });
        localStorage.removeItem("questions");
        setShowRecoverPopup(false);
      },
    });

  const categories = [
    "Job",
    "Applicant",
    "Reference Request",
    "Reference Question",
  ];

  // // Mock data for different categories
  // const mockData = useMemo(() => {
  //   return {
  //     Job: [
  //       // {
  //       //   id: 1,
  //       //   name: "Software Engineer",
  //       //   vacancy: 2,
  //       //   department: "Engineering",
  //       //   hiringManager: "John Doe",
  //       //   deletedDate: "2024-01-20",
  //       // },
  //       // {
  //       //   id: 2,
  //       //   name: "Product Manager",
  //       //   vacancy: 1,
  //       //   department: "Product",
  //       //   hiringManager: "Sarah Wilson",
  //       //   deletedDate: "2024-01-19",
  //       // },
  //       // {
  //       //   id: 3,
  //       //   name: "UI/UX Designer",
  //       //   vacancy: 3,
  //       //   department: "Design",
  //       //   hiringManager: "Mike Thompson",
  //       //   deletedDate: "2024-01-18",
  //       // },
  //       // {
  //       //   id: 4,
  //       //   name: "Marketing Specialist",
  //       //   vacancy: 2,
  //       //   department: "Marketing",
  //       //   hiringManager: "Emily Brown",
  //       //   deletedDate: "2024-01-17",
  //       // },
  //       // {
  //       //   id: 5,
  //       //   name: "Sales Manager",
  //       //   vacancy: 1,
  //       //   department: "Sales",
  //       //   hiringManager: "David Clark",
  //       //   deletedDate: "2024-01-16",
  //       // },
  //     ],
  //     Applicant: [
  //       // {
  //       //   id: 1,
  //       //   name: "Jane Smith",
  //       //   email: "jane@example.com",
  //       //   position: "Developer",
  //       //   deletedDate: "2024-01-21",
  //       // },
  //       // {
  //       //   id: 2,
  //       //   name: "Robert Johnson",
  //       //   email: "robert@example.com",
  //       //   position: "Designer",
  //       //   deletedDate: "2024-01-20",
  //       // },
  //       // {
  //       //   id: 3,
  //       //   name: "Lisa Anderson",
  //       //   email: "lisa@example.com",
  //       //   position: "Manager",
  //       //   deletedDate: "2024-01-19",
  //       // },
  //       // {
  //       //   id: 4,
  //       //   name: "Michael Lee",
  //       //   email: "michael@example.com",
  //       //   position: "Analyst",
  //       //   deletedDate: "2024-01-18",
  //       // },
  //       // {
  //       //   id: 5,
  //       //   name: "Emma Davis",
  //       //   email: "emma@example.com",
  //       //   position: "Coordinator",
  //       //   deletedDate: "2024-01-17",
  //       // },
  //     ],
  //     "Reference Request": [
  //       // {
  //       //   id: 1,
  //       //   candidateName: "John Smith",
  //       //   referentName: "Mary Johnson",
  //       //   status: "Pending",
  //       //   deletedDate: "2024-01-22",
  //       // },
  //       // {
  //       //   id: 2,
  //       //   candidateName: "Sarah Wilson",
  //       //   referentName: "James Brown",
  //       //   status: "Completed",
  //       //   deletedDate: "2024-01-21",
  //       // },
  //       // {
  //       //   id: 3,
  //       //   candidateName: "Michael Davis",
  //       //   referentName: "Emma Thompson",
  //       //   status: "In Progress",
  //       //   deletedDate: "2024-01-20",
  //       // },
  //       // {
  //       //   id: 4,
  //       //   candidateName: "Laura Miller",
  //       //   referentName: "David Anderson",
  //       //   status: "Pending",
  //       //   deletedDate: "2024-01-19",
  //       // },
  //       // {
  //       //   id: 5,
  //       //   candidateName: "Robert Wilson",
  //       //   referentName: "Jennifer Lee",
  //       //   status: "Completed",
  //       //   deletedDate: "2024-01-18",
  //       // },
  //     ],

  //     "Reference Question": [
  //       // {
  //       //   id: 1,
  //       //   question: "Describe your leadership style",
  //       //   numberOfQuestions: "5",
  //       //   deletedDate: "2024-01-23",
  //       // },
  //       // {
  //       //   id: 2,
  //       //   question: "How do you handle conflict resolution?",
  //       //   numberOfQuestions: "4",
  //       //   deletedDate: "2024-01-22",
  //       // },
  //       // {
  //       //   id: 3,
  //       //   question: "What are your key strengths and weaknesses?",
  //       //   numberOfQuestions: "6",
  //       //   deletedDate: "2024-01-21",
  //       // },
  //       // {
  //       //   id: 4,
  //       //   question: "Describe a challenging project you managed",
  //       //   numberOfQuestions: "3",
  //       //   deletedDate: "2024-01-20",
  //       // },
  //       // {
  //       //   id: 5,
  //       //   question: "How do you prioritize your work?",
  //       //   numberOfQuestions: "4",
  //       //   deletedDate: "2024-01-19",
  //       // },
  //     ],
  //   };
  // }, [referenceQuestion]);

  // Mock data for different categories
  const mockData = useMemo(() => {
    return {
      Job: [],
      Applicant: [],
      "Reference Request": [],

      "Reference Question": referenceQuestion?.questions || [],
    };
  }, [referenceQuestion]);

  const handleRestore = (id) => {
    switch (selectedCategory) {
      case "Job":
        console.log("Permanently deleting job:", id);
        break;
      case "Applicant":
        console.log("Permanently deleting candidate:", id);
        break;
      case "Reference Request":
        console.log("Permanently deleting reference request:", id);
        break;
      case "Reference Question":
        const questionIds = [id];
        restoreQuestion({ questionIds });
        break;
      default:
        return;
    }
  };

  const handleDelete = (id) => {
    switch (selectedCategory) {
      case "Job":
        console.log("Permanently deleting job:", id);
        break;
      case "Applicant":
        console.log("Permanently deleting candidate:", id);
        break;
      case "Reference Request":
        console.log("Permanently deleting reference request:", id);
        break;
      case "Reference Question":
        const questionIds = [id];
        deleteQuestions({ questionIds });
        break;
      default:
        return;
    }
  };

  const handleBulkRestore = () => {
    setShowRecoverPopup(true); // Shows the recover confirmation popup
  };

  const handleBulkDelete = () => {
    setShowDeletePopup(true); // Shows the delete confirmation popup
  };

  const handleConfirmRestore = () => {
    switch (selectedCategory) {
      case "Job":
        console.log("Permanently deleting job:", selectedItems);
        break;
      case "Applicant":
        console.log("Permanently deleting candidate:", selectedItems);
        break;
      case "Reference Request":
        console.log("Permanently deleting reference request:", selectedItems);
        break;
      case "Reference Question":
        restoreQuestion({ questionIds: selectedItems });
        break;
      default:
        return;
    }
    setSelectedItems([]);
  };

  const handleConfirmDelete = () => {
    switch (selectedCategory) {
      case "Job":
        console.log("Permanently deleting job:", selectedItems);
        break;
      case "Applicant":
        console.log("Permanently deleting candidate:", selectedItems);
        break;
      case "Reference Request":
        console.log("Permanently deleting reference request:", selectedItems);
        break;
      case "Reference Question":
        deleteQuestions({ questionIds: selectedItems });
        break;
      default:
        return;
    }
    setSelectedItems([]);
    // setShowDeletePopup(false);
  };

  const handleSelectAll = () => {
    switch (selectButtonState) {
      case "Select":
        setShowCheckboxes(true);
        setSelectButtonState("Select All");
        break;
      case "Select All":
        setSelectedItems(mockData[selectedCategory].map((item) => item._id));
        setSelectButtonState("Unselect All");
        break;
      case "Unselect All":
        setSelectedItems([]);
        setShowCheckboxes(false);
        setSelectButtonState("Select");
        break;
      default:
        return;
    }
  };

  const handleSelect = (id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAllCheckbox = () => {
    if (selectedItems.length === mockData[selectedCategory].length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(mockData[selectedCategory].map((item) => item.id));
    }
  };

  const getTableHeaders = () => {
    const baseHeaders = showCheckboxes
      ? [
          {
            label: (
              <input
                type="checkbox"
                className="form-check-input"
                checked={
                  selectedItems.length === mockData[selectedCategory].length
                }
                onChange={handleSelectAllCheckbox}
              />
            ),
            width: "50px",
          },
        ]
      : [];
    switch (selectedCategory) {
      case "Job":
        return [
          ...baseHeaders,
          "Job Name",
          { label: "Vacancy", className: "text-center" },
          "Department",
          "Hiring Manager",
          { label: "Deleted Date", className: "text-center" },
          "Actions",
        ];
      case "Applicant":
        return [
          ...baseHeaders,
          "Name",
          "Email",
          "Position",
          { label: "Deleted Date", className: "text-center" },
          "Actions",
        ];
      case "Reference Request":
        return [
          ...baseHeaders,
          "Applicant",
          "Referent",
          "Status",
          { label: "Deleted Date", className: "text-center" },
          "Actions",
        ];
      case "Reference Question":
        return [
          ...baseHeaders,
          "Question",
          { label: "No. of Questions", className: "text-center" },
          { label: "Deleted Date", className: "text-center" },
          "Actions",
        ];
      default:
        return [];
    }
  };

  const renderTableRow = (item) => {
    const props = {
      data: item,
      selectedItems,
      onSelect: handleSelect,
      onRestore: handleRestore,
      onDelete: handleDelete,
      showCheckboxes,
    };

    switch (selectedCategory) {
      case "Job":
        return <JobTable key={item._id} {...props} />;
      case "Applicant":
        return <ApplicantTable key={item.id} {...props} />;
      case "Reference Request":
        return <ReferenceRequestTable key={item.id} {...props} />;
      case "Reference Question":
        const propsData = {
          ...props,
          isDeletingReferenceQuestions,
          isRecoveringReferenceQuestions,
        };
        return <ReferenceQuestionTable key={item._id} {...propsData} />;
      default:
        return null;
    }
  };

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div>
        <h3 className="mb-0">Trash bin</h3>
        <p className="mb-2">View and restore deleted items from your system.</p>
      </div>

      <div
        className={`d-flex justify-content-between align-items-center mb-3 fade-in ${
          isSearchAndButtonsVisible ? "visible" : ""
        }`}
      >
        <div className="d-flex align-items-center search-trash">
          <div className="search-wrapper position-relative">
            <input
              type="text"
              placeholder="Search in trash..."
              className="form-control ps-4 pe-5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
          </div>
        </div>
        <div className="trashbin-category-filters d-flex gap-2 mb-3">
          {categories.map((category) => (
            <button
              key={category}
              className={` ${selectedCategory === category ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(category);
                setShowCheckboxes(false);
                setSelectedItems([]);
                setSelectButtonState("Select");
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`AiReference-trashbin-container fade-in ${
          isContainerVisible ? "visible" : ""
        }`}
      >
        <div className="trash-header mb-3">
          <h4 className="mb-2">Deleted {selectedCategory}s</h4>
          <p className="trashbin-important-text d-flex gap-2 align-items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 0C10.8661 0 14 3.1339 14 7C14 10.8661 10.8661 14 7 14C3.1339 14 0 10.8661 0 7C0 3.1339 3.1339 0 7 0ZM6.993 5.6H6.3C6.12158 5.6002 5.94998 5.66852 5.82024 5.79099C5.69051 5.91347 5.61244 6.08087 5.60198 6.25898C5.59152 6.43709 5.64947 6.61247 5.76399 6.74928C5.8785 6.8861 6.04093 6.97403 6.2181 6.9951L6.3 7V10.493C6.3 10.857 6.5758 11.158 6.93 11.1958L7.007 11.2H7.35C7.49722 11.2 7.64069 11.1536 7.76001 11.0674C7.87934 10.9811 7.96844 10.8595 8.01464 10.7197C8.06085 10.5799 8.06181 10.4291 8.01738 10.2888C7.97296 10.1484 7.88542 10.0256 7.7672 9.9379L7.7 9.8938V6.307C7.7 5.943 7.4242 5.642 7.07 5.6042L6.993 5.6ZM7 3.5C6.81435 3.5 6.6363 3.57375 6.50503 3.70503C6.37375 3.8363 6.3 4.01435 6.3 4.2C6.3 4.38565 6.37375 4.5637 6.50503 4.69497C6.6363 4.82625 6.81435 4.9 7 4.9C7.18565 4.9 7.3637 4.82625 7.49497 4.69497C7.62625 4.5637 7.7 4.38565 7.7 4.2C7.7 4.01435 7.62625 3.8363 7.49497 3.70503C7.3637 3.57375 7.18565 3.5 7 3.5Z"
                fill="#F46A05"
              />
            </svg>
            Items in trash will be permanently deleted after 10 days. Restore
            items to prevent permanent deletion.
          </p>
        </div>

        <div className="button-controls mb-3 d-flex gap-2 align-items-center justify-content-end">
          <button
            onClick={handleSelectAll}
            className={showCheckboxes ? "active" : ""}
          >
            {selectButtonState}
          </button>
          <button
            disabled={selectedItems.length === 0}
            onClick={handleBulkRestore}
            className={`${selectedItems.length === 0 ? "disabled" : ""}`}
          >
            {selectedItems.length === mockData[selectedCategory].length
              ? "Recover All"
              : "Recover"}
          </button>
          <button
            disabled={selectedItems.length === 0}
            onClick={handleBulkDelete}
            className={` ${selectedItems.length === 0 ? "disabled" : ""}`}
          >
            {selectedItems.length === mockData[selectedCategory].length
              ? "Delete All"
              : "Delete"}
          </button>
        </div>

        {mockData[selectedCategory].length > 0 ? (
          <table>
            <thead>
              <tr>
                {getTableHeaders().map((header, index) => (
                  <th
                    key={index}
                    style={
                      typeof header === "object"
                        ? { width: header.width }
                        : undefined
                    }
                    className={
                      typeof header === "object" ? header.className : ""
                    }
                  >
                    {typeof header === "object"
                      ? typeof header.label === "string"
                        ? header.label
                        : header.label
                      : header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockData[selectedCategory]?.map((item) => renderTableRow(item))}
            </tbody>
          </table>
        ) : (
          <div>No records found.</div>
        )}
      </div>

      {showDeletePopup && (
        <>
          {selectedCategory === "Job" && (
            <DeleteConfirmationJobPopUp
              onClose={() => setShowDeletePopup(false)}
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
            />
          )}
          {selectedCategory === "Applicant" && (
            <DeleteConfirmationApplicantPopUp
              onClose={() => setShowDeletePopup(false)}
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
            />
          )}
          {selectedCategory === "Reference Request" && (
            <DeleteConfirmationReferenceRequestPopUp
              onClose={() => setShowDeletePopup(false)}
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
            />
          )}
          {selectedCategory === "Reference Question" && (
            <DeleteConfirmationReferenceQuestionPopUp
              onConfirmDelete={handleConfirmDelete}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isDeletingReferenceQuestions={isDeletingReferenceQuestions}
            />
          )}
        </>
      )}

      {showRecoverPopup && (
        <>
          {selectedCategory === "Job" && (
            <RecoverConfirmationJobPopUp
              onClose={() => setShowRecoverPopup(false)}
              onConfirmRecover={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
            />
          )}
          {selectedCategory === "Applicant" && (
            <RecoverConfirmationApplicantPopUp
              onClose={() => setShowRecoverPopup(false)}
              onConfirmRecover={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
            />
          )}
          {selectedCategory === "Reference Request" && (
            <RecoverConfirmationReferenceRequestPopUp
              onClose={() => setShowRecoverPopup(false)}
              onConfirmRecover={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
            />
          )}
          {selectedCategory === "Reference Question" && (
            <RecoverConfirmationReferenceQuestionPopUp
              onClose={() => setShowRecoverPopup(false)}
              onConfirmRecover={handleConfirmRestore}
              selectedCount={selectedItems.length}
              isAll={selectedItems.length === mockData[selectedCategory].length}
              isRecoveringReferenceQuestions={isRecoveringReferenceQuestions}
            />
          )}
        </>
      )}
      {showGuide && <PopupGuide introKey="trashbin" />}
    </div>
  );
};

export default Trashbin;
