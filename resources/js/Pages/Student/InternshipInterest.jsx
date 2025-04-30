import { useForm, usePage } from "@inertiajs/react";
import Button from "@/js/components/Button";
import { useEffect } from "react";

function InternshipInterest() {
  const { auth } = usePage().props;
  const {
    data,
    setData,
    post,
    reset,
    processing,
    errors: formErrors,
  } = useForm({
    interests: "",
    languages: [],
    otherLanguages: "",
    framework: [],
    otherFrameworks: "",
    user_id: "",
    resume: ""
  });

  useEffect(() => {
    setData("user_id", auth.user.id);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    post("/ftsp-proj/intern-interest");
  };

  function handleLanguageChange(e) {
    const { value, checked } = e.target;
    // it adds the new lang that was checked into the data.codingLang and removes it if it is unchecked
    setData((prevData) => ({
      ...prevData,
      languages: checked
        ? [...prevData.languages, value]
        : prevData.languages.filter((lang) => lang !== value),
    }));
  }

  function handleFrameworkChange(e) {
    const { value, checked } = e.target;
    // it adds the new lang that was checked into the data.codingLang and removes it if it is unchecked
    setData((prevData) => ({
      ...prevData,
      framework: checked
        ? [...prevData.framework, value]
        : prevData.framework.filter((lang) => lang !== value),
    }));
  }


  return <section id="add-internship-interest">
    <h3 className="ps-4 mt-4">Internship Student Form</h3>
    <h5 className="ps-4 mb-4">Please answer the questions below:</h5>
    <form className="container m-0" onSubmit={handleSubmit}>
      <div className="row container">
        <div className="col">
          <label htmlFor="coding">
            What coding languages do you prefer for your internship?
          </label>
          <div className="row gap-4 mb-3">
            <div className="col ">
              <div className="row my-3">
                <input
                  id="html"
                  type="checkbox"
                  value="html"
                  name="languages"
                  className="col"
                  checked={data.languages.includes(
                    "html"
                  )}
                  onChange={handleLanguageChange}
                />
                <label htmlFor="html" className="col">
                  HTML
                </label>
              </div>
              <div className="row my-3">
                <input
                  id="css"
                  type="checkbox"
                  value="css"
                  className="col"
                  name="languages"
                  checked={data.languages.includes(
                    "css"
                  )}
                  onChange={handleLanguageChange}
                />
                <label htmlFor="css" className="col">
                  CSS
                </label>
              </div>
              <div className="row ">
                <input
                  id="js"
                  className="col"
                  name="languages"
                  type="checkbox"
                  value="javascript"
                  checked={data.languages.includes(
                    "javascript"
                  )}
                  onChange={handleLanguageChange}
                />
                <label htmlFor="js" className="col">
                  Javascript
                </label>
              </div>
            </div>
            <div className="col ">
              <div className="row my-3">
                <input
                  id="php"
                  type="checkbox"
                  value="php"
                  className="col"
                  name="languages"
                  checked={data.languages.includes(
                    "php"
                  )}
                  onChange={handleLanguageChange}
                />
                <label htmlFor="php" className="col">
                  PHP
                </label>
              </div>
              <div className="row my-3">
                <input
                  id="c#"
                  type="checkbox"
                  value="c#"
                  className="col"
                  name="languages"
                  checked={data.languages.includes("c#")}
                  onChange={handleLanguageChange}
                />
                <label htmlFor="c#" className="col">
                  C#
                </label>
              </div>
            </div>
            <div className="col">
              <label htmlFor="otherLanguages">Others</label>
              <br />
              <input
                className="col"
                type="string"
                placeholder="C++, Python"
                name="otherLanguages"
                id="otherLanguages"
                value={data.otherLanguages}
                onChange={(e) =>
                  setData("otherLanguages", e.target.value)
                }
              />
            </div>
            {formErrors.languages && (
              <p className="errors text-danger">{formErrors.languages}</p>
            )}
          </div>

          <label htmlFor="framework">
            What frameworks do you prefer for your internship?
          </label>

          <div className="row gap-4 mb-3">
            <div className="col ">
              <div className="row my-3">
                <input
                  id="angular"
                  type="checkbox"
                  value="angular"
                  name="framework"
                  className="col"
                  checked={data.framework.includes(
                    "angular"
                  )}
                  onChange={handleFrameworkChange}
                />
                <label htmlFor="angular" className="col">
                  Angular
                </label>
              </div>
              <div className="row my-3">
                <input
                  id="vue"
                  type="checkbox"
                  value="vue"
                  className="col"
                  name="framework"
                  checked={data.framework.includes("vue")}
                  onChange={handleFrameworkChange}
                />
                <label htmlFor="vue" className="col">
                  Vue.js
                </label>
              </div>
              <div className="row">
                <input
                  id="react"
                  className="col"
                  type="checkbox"
                  name="framework"
                  value="react"
                  checked={data.framework.includes(
                    "react"
                  )}
                  onChange={handleFrameworkChange}
                />
                <label htmlFor="react" className="col">
                  React.js
                </label>
              </div>
            </div>
            <div className="col ">
              <div className="row my-3">
                <input
                  id="asp"
                  type="checkbox"
                  value="asp"
                  className="col"
                  name="framework"
                  checked={data.framework.includes("asp")}
                  onChange={handleFrameworkChange}
                />
                <label htmlFor="asp" className="col">
                  ASP.NET
                </label>
              </div>
              <div className="row">
                <input
                  id="laravel"
                  name="framework"
                  type="checkbox"
                  value="laravel"
                  className="col"
                  checked={data.framework.includes(
                    "laravel"
                  )}
                  onChange={handleFrameworkChange}
                />
                <label htmlFor="laravel" className="col">
                  Laravel
                </label>
              </div>
            </div>
            <div className="col">
              <label htmlFor="otherFrameworks">Others</label>
              <br />
              <input
                className="col"
                type="string"
                name="otherFrameworks"
                id="otherFrameworks"
                placeholder="NodeJS, Flask"
                value={data.otherFrameworks}
                onChange={(e) =>
                  setData(
                    "otherFrameworks",
                    e.target.value
                  )
                }
              />
            </div>
            {formErrors.framework && (
              <p className="errors text-danger">{formErrors.framework}</p>
            )}
          </div>
          <label htmlFor="interests" className="mt-4 mb-2">State other interests you would like to pursue:</label>
          <br />
          <textarea
            type="text"
            value={data.interests}
            className="w-90 mt-1"
            name="interests"
            rows={3}
            onChange={(e) =>
              setData("interests", e.target.value)
            }
          />
          {formErrors.interests && (
            <p className="errors text-danger">{formErrors.interests}</p>
          )}
          <label htmlFor="resume" className="mb-2">Upload your resume:</label>
          <br />
          <input type="file" id="resume" name="resume" className="mt-1" onChange={(e) => setData("resume", e.target.files[0])}></input>
          <br />
          <input hidden value={data.user_id} readOnly />
          <Button
            disabled={processing}
            type="submit"
            className="ms-2 mt-5"
          >
            Add Listing
          </Button>
        </div>
      </div>
    </form>
  </section>
}

export default InternshipInterest;