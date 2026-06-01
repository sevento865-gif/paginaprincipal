import { db } from "./firebase.js";
 
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
 
/* ─── Estado ─────────────────────────────────────── */
let editando     = null;
let imagenBase64 = "";
 
/* ─── SELECCIONAR IMAGEN ─────────────────────────── */
document.getElementById("imagenFile").addEventListener("change", function() {
  const file = this.files[0];
  if (!file) return;
 
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX = 800;
      let w = img.width, h = img.height;
      if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
      if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; }
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      imagenBase64 = canvas.toDataURL("image/jpeg", 0.75);
      document.getElementById("previewImg").src           = imagenBase64;
      document.getElementById("previewImg").style.display = "block";
      document.getElementById("uploadText").style.display = "none";
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});
 
/* ─── GUARDAR / EDITAR ───────────────────────────── */
window.agregarProducto = async function() {
  const nombre      = document.getElementById("nombre").value.trim();
  const precio      = document.getElementById("precio").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const categoria   = document.getElementById("categoria").value;
 
  if (!nombre || !precio) {
    alert("⚠️ El nombre y el precio son obligatorios.");
    return;
  }
 
  const imagen = imagenBase64 || document.getElementById("imagenActual").value || "";
 
  const btn = document.querySelector(".btn-guardar");
  btn.disabled    = true;
  btn.textContent = "Guardando…";
 
  try {
    if (editando) {
      await updateDoc(doc(db, "productos", editando), {
        nombre, precio, descripcion, categoria, imagen
      });
      editando = null;
      btn.textContent = "✅ ¡Actualizado!";
    } else {
      await addDoc(collection(db, "productos"), {
        nombre, precio, descripcion, categoria, imagen
      });
      btn.textContent = "✅ ¡Guardado!";
    }
    limpiar();
    await mostrarProductosAdmin();
  } catch(err) {
    console.error(err);
    alert("❌ Error: " + err.message);
    btn.textContent = "Guardar Producto";
  } finally {
    btn.disabled = false;
    setTimeout(() => { btn.textContent = editando ? "💾 Guardar Cambios" : "Guardar Producto"; }, 2000);
  }
};
 
/* ─── MOSTRAR lista ──────────────────────────────── */
window.mostrarProductosAdmin = async function() {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "<p style='color:#aaa;padding:20px'>Cargando…</p>";
 
  const filtro = document.getElementById("filtroCategoria").value;
  const snap   = await getDocs(collection(db, "productos"));
 
  contenedor.innerHTML = "";
 
  if (snap.empty) {
    contenedor.innerHTML = "<p style='color:#aaa;padding:20px'>No hay productos aún.</p>";
    return;
  }
 
  snap.forEach(docu => {
    const d = docu.data();
    if (filtro !== "todos" && d.categoria !== filtro) return;
 
    const div = document.createElement("div");
    div.className = "producto-admin";
 
    /* Guardar datos en dataset — sin comillas en onclick */
    div.innerHTML = `
      <img src="${d.imagen || ''}" onerror="this.style.display='none'">
      <div class="producto-admin-info">
        <b>${d.nombre || ''}</b>
        <span class="categoria-badge">${d.categoria || ''}</span>
        <span class="precio-admin">${d.precio || ''}</span>
        ${d.descripcion ? `<p>${d.descripcion}</p>` : ""}
      </div>
      <div class="producto-admin-btns">
        <button class="btn-editar">✏️ Editar</button>
      </div>
    `;
 
    /* Guardar todos los datos en el botón — sin problemas de comillas */
    const btnEditar = div.querySelector(".btn-editar");
    btnEditar.dataset.id          = docu.id;
    btnEditar.dataset.nombre      = d.nombre      || "";
    btnEditar.dataset.precio      = d.precio      || "";
    btnEditar.dataset.descripcion = d.descripcion || "";
    btnEditar.dataset.categoria   = d.categoria   || "basica";
    btnEditar.dataset.imagen      = d.imagen      || "";
 
    btnEditar.addEventListener("click", function() {
      cargarEdicion(
        this.dataset.id,
        this.dataset.nombre,
        this.dataset.precio,
        this.dataset.descripcion,
        this.dataset.categoria,
        this.dataset.imagen
      );
    });
 
    contenedor.appendChild(div);
 
    const hr = document.createElement("hr");
    contenedor.appendChild(hr);
  });
};
 
/* ─── CARGAR datos para editar ───────────────────── */
function cargarEdicion(id, nombre, precio, desc, cat, img) {
  editando     = id;
  imagenBase64 = "";
 
  document.getElementById("nombre").value       = nombre;
  document.getElementById("precio").value       = precio;
  document.getElementById("descripcion").value  = desc;
  document.getElementById("categoria").value    = cat;
  document.getElementById("imagenActual").value = img;
 
  if (img) {
    document.getElementById("previewImg").src           = img;
    document.getElementById("previewImg").style.display = "block";
    document.getElementById("uploadText").style.display = "none";
  } else {
    document.getElementById("previewImg").style.display = "none";
    document.getElementById("uploadText").style.display = "block";
  }
 
  document.getElementById("nombre").scrollIntoView({ behavior: "smooth" });
  document.querySelector(".btn-guardar").textContent = "💾 Guardar Cambios";
}
 
/* ─── LIMPIAR ────────────────────────────────────── */
function limpiar() {
  document.getElementById("nombre").value       = "";
  document.getElementById("precio").value       = "";
  document.getElementById("descripcion").value  = "";
  document.getElementById("imagenFile").value   = "";
  document.getElementById("imagenActual").value = "";
  document.getElementById("previewImg").style.display  = "none";
  document.getElementById("uploadText").style.display  = "block";
  document.querySelector(".btn-guardar").textContent   = "Guardar Producto";
  imagenBase64 = "";
  editando     = null;
}
 
/* ─── INICIO ─────────────────────────────────────── */
window.addEventListener("DOMContentLoaded", mostrarProductosAdmin);
