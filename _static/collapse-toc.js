// Torna os "caption" (partes) do índice lateral clicáveis/retráteis.
document.addEventListener("DOMContentLoaded", function () {
  var captions = document.querySelectorAll(
    ".bd-sidebar-primary .caption, #bd-docs-nav .caption, nav.bd-links .caption"
  );

  captions.forEach(function (caption) {
    var list = caption.nextElementSibling;
    if (!list || list.tagName !== "UL") return;

    var key = "toc-collapsed::" + caption.textContent.trim();

    // Se a parte atual contém a página aberta, mantém expandida.
    var containsCurrentPage = list.querySelector("li.current, a.current") !== null;

    // Restaura o estado salvo (padrão: expandido), a menos que contenha a página atual.
    if (!containsCurrentPage && localStorage.getItem(key) === "true") {
      caption.classList.add("collapsed");
    }

    caption.addEventListener("click", function () {
      caption.classList.toggle("collapsed");
      localStorage.setItem(key, caption.classList.contains("collapsed"));
    });
  });
});
