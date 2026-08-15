const jotformUrl = "https://pci.jotform.com/form/261551537343052";

document.querySelectorAll('a[href="' + jotformUrl + '"]').forEach((link) => {
  link.addEventListener("click", () => {
    localStorage.setItem("armoredSwingLastCtaClick", new Date().toISOString());
  });
});
