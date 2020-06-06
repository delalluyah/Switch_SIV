import React, { useState, useEffect } from "react";
import Card from "../../shared/Card";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./SalesPreview.css";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import constants from "../../constants";
import utils from "../../../utils";

function SalesPreview({ sales, setError, auth }) {
  const [amountPaid, setAmountPaid] = useState(0);
  const [balance, setBalance] = useState(0);
  let receiptNum;

  (function setReceiptNumber() {
    receiptNum = "LL-" + Date.now().toString();
  })();

  useEffect(() => {
    generateIframe();
    setupPreview(sales, receiptNum, auth.user.fullname);

    return () => {
      //cleanup
    };
  }, []);
  const { grandTotal, products } = sales;
  let retails = products.filter(
    (el) => el.saleTypeId === constants.salesTypeConstants.Retail
  );
  let bulks = products.filter(
    (el) => el.saleTypeId === constants.salesTypeConstants.Bulk
  );

  function onChangeAmountPaid(e) {
    let amount = e.target.value;
    setAmountPaid(amount);
    amount = parseFloat(amount);
    let bal = amount - sales.grandTotal;
    if (bal <= 0) setBalance(0);
    else setBalance(bal);
  }

  function onSubmit(e) {
    //generateIframe();
    printIframe();
    if (amountPaid <= 0 || amountPaid < sales.grandTotal) {
      setError("Amount paid cannot be less than Total");
      return;
    }
  }

  return (
    <Card subtitle="Sales Preview" wide={true}>
      <div className="flex">
        <div className="sales-preview">
          <table>
            {populateProducts(retails, true)}
            {populateProducts(bulks, false)}
            <thead>
              <tr className="g-total">
                <th colSpan="4">GRAND TOTAL: GHS {grandTotal}</th>
              </tr>
            </thead>
          </table>
          <div className="two-col">
            <Input
              name="paid"
              label="Amount Paid"
              placeholder="Amount Paid"
              type="number"
              value={amountPaid}
              onChange={onChangeAmountPaid}
              min="0"
            />
            <Input
              name="balance"
              label="Balance"
              placeholder="Balance"
              value={balance}
              type="number"
              onChange={(x) => x}
              min="0"
              readOnly
            />
          </div>
          <Button text="Submit & Print" onClick={onSubmit} />
        </div>
        <div id="preview-sec"></div>
      </div>
    </Card>
  );
}

const mapStateToProps = ({ sales, auth }) => {
  return { sales, auth };
};

function populateProducts(products, retail) {
  let topic = retail === true ? "Retail" : "Bulk";
  if (products != null && products.length > 0)
    return (
      <>
        <thead>
          <tr className="table-top">
            <th colSpan="4">{topic}</th>
          </tr>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((el, index) => (
            <tr key={index}>
              <td>{el.name}</td>
              <td>GHC {retail === true ? el.unitPrice : el.bulkPrice}</td>
              <td>{el.quantity}</td>
              <td>GHC {el.total}</td>
            </tr>
          ))}
        </tbody>
      </>
    );
  return null;
}

function generateIframe() {
  let iframe = document.createElement("iframe");
  iframe.setAttribute("title", "print_preview_frame");
  iframe.setAttribute("name", "print_preview");
  iframe.setAttribute("id", "print_preview");
  iframe.setAttribute("width", "300px");
  iframe.setAttribute("height", "400px");

  let prev = document.getElementById("preview-sec");
  if (prev.children.length > 0) {
    let children = Array.from(prev.children);
    for (let child of children) {
      child.parentElement.removeChild(child);
    }
  }
  prev.appendChild(iframe);
}

function printIframe() {
  // const css = String(
  //   `<link href="custom_styles/printpdf.css"  rel="text/stylesheet"/>`
  // );
  setTimeout(() => {
    let frame = window.frames["print_preview"];
    frame.window.focus();
    frame.window.print();
  }, 500);
}

function genElement(label, className, ...children) {
  let elem;
  if (label.toLowerCase() === "text") {
    elem = document.createTextNode(className);
  } else {
    elem = document.createElement(label);

    elem.setAttribute("class", className);
    if (children !== null && children !== undefined) {
      for (var item of children) {
        elem.appendChild(item);
      }
    }
  }
  return elem;
}

function setupPreview(sales, receiptNum, username) {
  let frame = window.frames["print_preview"];
  let titles = [
    genElement(
      "h4",
      "text-center",
      genElement("text", constants.company.name.toUpperCase())
    ),
    genElement(
      "h6",
      "text-center",
      genElement("text", constants.company.location.toUpperCase())
    ),
    genElement(
      "h6",
      "text-center",
      genElement("text", constants.company.phone)
    ),
    genElement(
      "h6",
      "text-center",
      genElement("text", constants.company.email)
    ),
  ];
  for (var item of titles) {
    item.style.textAlign = "center";
    item.style.margin = "5px";
    frame.document.body.appendChild(item);
  }
  let receiptName = genElement(
    "h4",
    "",
    genElement("text", "Cash Sales Receipt")
  );
  receiptName.style.textAlign = "center";
  receiptName.style.textDecoration = "underline";
  frame.document.body.appendChild(receiptName);
  frame.document.body.appendChild(genElement("hr", ""));
  let currDate = new Date().toUTCString().split(" ").slice(0, 5).join(" ");
  let subelems = [
    genElement("h6", "", genElement("text", "Receipt No :  " + receiptNum)),
    genElement("h6", "", genElement("text", "Sales Person :  " + username)),
    genElement("h6", "", genElement("text", "Date :  " + currDate)),
  ];
  for (let item of subelems) {
    item.style.margin = "3px";
    frame.document.body.appendChild(item);
  }
  frame.document.body.appendChild(genElement("br", ""));

  let salesDom = sales.products.map((prod) => {
    return genElement(
      "tr",
      "",
      genElement("td", "", genElement("text", prod.name)),
      genElement("td", "", genElement("text", prod.saleTypeName.split(" ")[0])),
      genElement(
        "td",
        "",
        genElement(
          "text",
          "GHC " +
            (prod.saleTypeId === constants.salesTypeConstants.Bulk
              ? prod.bulkPrice
              : prod.unitPrice)
        )
      ),
      genElement("td", "", genElement("text", prod.quantity)),
      genElement("td", "", genElement("text", "GHC " + prod.total))
    );
  });

  let table = genElement(
    "table",
    "",
    genElement(
      "thead",
      "",
      genElement(
        "tr",
        "",
        genElement("td", "", genElement("text", "Name")),
        genElement("td", "", genElement("text", "Type")),
        genElement("td", "", genElement("text", "Price")),
        genElement("td", "", genElement("text", "Qty")),
        genElement("td", "", genElement("text", "Amt"))
      )
    ),
    genElement("tbody", "products-section")
  );
  table.style.width = "100%";
  table.style.fontSize = "10px";
  Array.from(table.querySelectorAll("thead")).forEach((el) => {
    el.style.fontWeight = "bold";
  });
  salesDom.forEach((el) =>
    table.querySelector(".products-section").appendChild(el)
  );
  frame.document.body.appendChild(table);
}
export default connect(mapStateToProps, {
  setError: utils.setError,
})(withRouter(SalesPreview));
