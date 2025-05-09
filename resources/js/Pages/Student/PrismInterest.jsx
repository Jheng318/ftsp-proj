import { useForm, usePage } from "@inertiajs/react";
import Button from "@/js/components/Button";
import { useEffect } from "react";

function PrismInterest({ studentInterest }) {
  const { auth } = usePage().props;
  let otherLanguages = "";
  let otherFrameworks = "";
  let languages = (studentInterest.length !== 0) ? studentInterest.languages.toLowerCase().split(", ") : [];
  let frameworks = (studentInterest.length !== 0) ? studentInterest.framework.toLowerCase().split(", ") : [];

  if (studentInterest.length !== 0) {

    function removeMatchingItems(array1, array2) {
      return array1.filter(item => array2.includes(item));
    }
    const allowedLanguages = ["html", "css", "javascript", "php", "c#"];

    languages.forEach(language => {
      if (!allowedLanguages.includes(language)) {
        otherLanguages += language + ", ";
      }
    });
    languages = removeMatchingItems(languages, allowedLanguages);

    const allowedFrameworks = ["angular", "vue", "react", "asp", "laravel"];


    frameworks.forEach(framework => {
      if (!allowedFrameworks.includes(framework)) {
        otherFrameworks += framework + ", ";
      }
    });
    frameworks = removeMatchingItems(frameworks, allowedFrameworks);
  }

  const {
    data,
    setData,
    post,
    put,
    reset,
    processing,
    errors: formErrors,
  } = useForm({
    languages: languages || [],
    otherLanguages: otherLanguages || "",
    framework: frameworks || [],
    otherFrameworks: otherFrameworks || "",
    web_dev: studentInterest?.web_dev_ranking || "",
    mad: studentInterest?.mad_ranking || "",
    rpa: studentInterest?.rpa_ranking || "",
    uiux: studentInterest?.uiux_ranking || ""
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (studentInterest.length !== 0) {
      put("/ftsp-proj/prism-interest");
    } else {
      post("/ftsp-proj/prism-interest");
    }
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
    <h3 className="ps-4 mt-4">PRISM Student Form</h3>
    <h5 className="ps-4 mb-4">Please answer the questions below:</h5>
    <form className="container m-0" onSubmit={handleSubmit}>
      <div className="row container">
        <div className="col">
          <p className="m-0">
            What coding languages do you prefer for your project?
          </p>
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

          <p className="m-0">
            What frameworks do you prefer for your project?
          </p>

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
          
          <p className="m-0">Please rank your interests based on skill area:</p>
          <div className="row mb-3 mt-3">
            <div className="col">
              <label htmlFor="web_dev">Web Development</label>
              <br />
              <select
                id="web_dev"
                className="col w-50"
                value={data.web_dev}
                name="web_dev"
                onChange={(e) =>
                  setData("web_dev", e.target.value)
                }
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="mad">Mobile Development</label>
              <br />
              <select
                id="mad"
                className="col w-50"
                value={data.mad}
                name="mad"
                onChange={(e) =>
                  setData("mad", e.target.value)
                }
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="rpa">Robotic Process Automation</label>
              <br />
              <select
                id="rpa"
                className="col w-50"
                value={data.rpa}
                name="rpa"
                onChange={(e) =>
                  setData("rpa", e.target.value)
                }
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="uiux">UIUX Design</label>
              <br />
              <select
                id="uiux"
                className="col w-50"
                value={data.uiux}
                name="uiux"
                onChange={(e) =>
                  setData("uiux", e.target.value)
                }
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <br />

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

export default PrismInterest;