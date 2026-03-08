import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./AdminServices.css";

const emptyService = {
  title: "",
  slug: "",
  title_description: "",
  image_url: "",
  overview_image_url: "",
  overview_content: "",
  why_title: "",
  why_items: "",
  why_content: "",
  who_title: "",
  who_items: "",
  faqs: "",
  note: "",
  image: null,
  overview_image: null,
};

export default function AdminServices() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyService);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("care_services")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching services:", error);
    } else {
      setServices(data || []);
    }
  };

  // ✅ FIXED IMAGE UPLOAD FUNCTIONS
  const uploadImageToStorage = async (file) => {
    if (!file) return null;

    try {
      // Create unique filename: service-slug-timestamp.jpg
      const fileExt = file.name.split('.').pop();
      const timestamp = Date.now();
      const fileName = `${form.slug || 'service'}-${timestamp}.${fileExt}`;
      const filePath = `service-images/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('service-images')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('service-images')
        .getPublicUrl(filePath);

      console.log('✅ Image uploaded:', urlData.publicUrl);
      return urlData.publicUrl;
    } catch (error) {
      console.error('❌ Upload error:', error);
      alert(`Image upload failed: ${error.message}`);
      return null;
    }
  };

  // ✅ MAIN IMAGE HANDLER
  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const url = await uploadImageToStorage(file);
      setUploading(false);
      
      if (url) {
        setForm({ ...form, image: null, image_url: url });
        e.target.value = ''; // Reset input
      }
    }
  };

  // ✅ OVERVIEW IMAGE HANDLER
  const handleOverviewImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const url = await uploadImageToStorage(file);
      setUploading(false);
      
      if (url) {
        setForm({ ...form, overview_image: null, overview_image_url: url });
        e.target.value = ''; // Reset input
      }
    }
  };

  const handleFaqImageUpload = async (e) => {
  const file = e.target.files[0];
  if (file) {
    setUploading(true);
    const url = await uploadImageToStorage(file); // ✅ same helper you already use
    setUploading(false);

    if (url) {
      setForm({ ...form, faq_image: null, faq_image_url: url });
      e.target.value = ''; // reset input
    }
  }
};

  const handleEditClick = (service) => {
    setEditingId(service.id);
    setForm({
      title: service.title || "",
      slug: service.slug || "",
      title_description: service.title_description || "",
      image_url: service.image_url || "",
      overview_image_url: service.overview_image_url || "",
      overview_content: service.overview_content || "",
      why_title: service.why_title || "",
      why_items: Array.isArray(service.why_items) ? service.why_items.join('\n') : service.why_items || "",
      why_content: service.why_content || "",
      who_title: service.who_title || "",
      who_items: Array.isArray(service.who_items) ? service.who_items.join('\n') : service.who_items || "",
      faqs: typeof service.faqs === 'string' ? service.faqs : JSON.stringify(service.faqs || []),
      note: service.note || "",
      image: null,
      overview_image: null,
    });
  };

  const handleCancelEdit = () => {
    setForm(emptyService);
    setEditingId(null);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = form.slug || generateSlug(form.title);
      
      // ✅ Parse form data for database
      const payload = {
        title: form.title,
        slug: slug,
        title_description: form.title_description,
        image_url: form.image_url || null,
        overview_image_url: form.overview_image_url || null,
        faq_image_url: form.faq_image_url || null, 
        overview_content: form.overview_content,
        why_title: form.why_title,
        why_items: form.why_items
          .split("\n")
          .map(item => item.trim())
          .filter(Boolean),
        why_content: form.why_content,
        who_title: form.who_title,
        who_items: form.who_items
          .split("\n")
          .map(item => item.trim())
          .filter(Boolean),
        faqs: form.faqs ? JSON.parse(form.faqs) : [],
        note: form.note,
        is_active: true,
      };

      if (editingId) {
        const { error } = await supabase
          .from("care_services")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        alert("✅ Service updated successfully! View at /services/" + slug);
      } else {
        const { error } = await supabase
          .from("care_services")
          .insert([payload]);
        if (error) throw error;
        alert("✅ Service added successfully! View at /services/" + slug);
      }

      setForm(emptyService);
      setEditingId(null);
      fetchServices();
    } catch (error) {
      console.error("Error:", error);
      alert(`❌ Failed: ${error.message}`);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    if (window.confirm(`Are you sure? This will ${currentStatus ? 'hide' : 'activate'} this service.`)) {
      const { error } = await supabase
        .from("care_services")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) {
        alert("Failed to update service status");
      } else {
        fetchServices();
      }
    }
  };

  const deleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      const { error } = await supabase
        .from("care_services")
        .delete()
        .eq("id", id);

      if (error) {
        alert("Failed to delete service");
      } else {
        fetchServices();
      }
    }
  };

  return (
    <div className="admin-services">
      <div className="admin-header">
        <h2>🔧 Admin – Care Services</h2>
        <button className="back-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>

      <div className="form-header">
        <h3>{editingId ? '✏️ Edit Service' : '➕ Add New Service'}</h3>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        {/* 🏷️ BASIC INFO */}
        <input
          placeholder="Service Title *"
          value={form.title}
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Slug (optional - auto-generated)"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <textarea
          placeholder="Header Description (shows under title)"
          value={form.title_description}
          rows={2}
          onChange={(e) => setForm({ ...form, title_description: e.target.value })}
        />

        {/* 🖼️ MAIN IMAGE UPLOAD */}
        <div className="file-input-wrapper">
          <input
            type="file"
            accept="image/*"
            id="main-image"
            onChange={handleMainImageUpload}
            style={{ display: 'none' }}
            disabled={uploading}
          />
          <label htmlFor="main-image" className="file-btn">
            📷 {form.image_url ? '✅ Main Image Set' : '📷 Main Image'}
          </label>
          {form.image_url && (
            <div className="image-preview-container">
              <img src={form.image_url} alt="Main Preview" className="image-preview" />
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => setForm({ ...form, image_url: '' })}
              >
                ❌ Remove
              </button>
            </div>
          )}
        </div>

        {/* 🖼️ OVERVIEW IMAGE UPLOAD */}
        <div className="file-input-wrapper">
          <input
            type="file"
            accept="image/*"
            id="overview-image"
            onChange={handleOverviewImageUpload}
            style={{ display: 'none' }}
            disabled={uploading}
          />
          <label htmlFor="overview-image" className="file-btn">
            🖼️ {form.overview_image_url ? '✅ Overview Image Set' : '🖼️ Overview Image'}
          </label>
          {form.overview_image_url && (
            <div className="image-preview-container">
              <img src={form.overview_image_url} alt="Overview Preview" className="image-preview" />
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => setForm({ ...form, overview_image_url: '' })}
              >
                ❌ Remove
              </button>
            </div>
          )}
        </div>

        {/* 📝 OVERVIEW SECTION */}
        <textarea
          placeholder="Overview Content (appears with overview image)"
          value={form.overview_content}
          rows={4}
          onChange={(e) => setForm({ ...form, overview_content: e.target.value })}
        />

        {/* ⭐ WHY CHOOSE SECTION */}
        <textarea
          placeholder="Why Choose Title (e.g. 'Why Choose Us?')"
          value={form.why_title}
          rows={2}
          onChange={(e) => setForm({ ...form, why_title: e.target.value })}
        />
        <textarea
          placeholder='Why Items (ONE per line, max 3): "Personalized Care"\n"24/7 Support"\n"Affordable Prices"'
          value={form.why_items}
          rows={4}
          onChange={(e) => setForm({ ...form, why_items: e.target.value })}
        />
        <textarea
          placeholder="Why Choose Subtitle"
          value={form.why_content}
          rows={2}
          onChange={(e) => setForm({ ...form, why_content: e.target.value })}
        />

        {/* 👥 WHO FOR SECTION */}
        <textarea
          placeholder="Who Title (e.g. 'Perfect For')"
          value={form.who_title}
          rows={2}
          onChange={(e) => setForm({ ...form, who_title: e.target.value })}
        />
        <textarea
          placeholder='Who Items (ONE per line, max 3): "Elderly"\n"Disabled Adults"\n"Families"'
          value={form.who_items}
          rows={4}
          onChange={(e) => setForm({ ...form, who_items: e.target.value })}
        />

     {/* ❓ FAQ SECTION */}
<textarea
  placeholder='7 FAQs (JSON format):\n[{"q":"What is this service?","a":"Helps with daily activities"}]\n[{"q":"How much?","a":"$25/hour"}]'
  value={form.faqs}
  rows={8}
  onChange={(e) => setForm({ ...form, faqs: e.target.value })}
/>

{/* 🖼️ FAQ IMAGE UPLOAD */}
<div className="file-input-wrapper">
  <input
    type="file"
    accept="image/*"
    id="faq-image"
    onChange={handleFaqImageUpload}   // ✅ new handler
    style={{ display: 'none' }}
    disabled={uploading}
  />
  <label htmlFor="faq-image" className="file-btn">
    🖼️ {form.faq_image_url ? '✅ FAQ Image Set' : '🖼️ FAQ Image'}
  </label>
  {form.faq_image_url && (
    <div className="image-preview-container">
      <img
        src={form.faq_image_url}
        alt="FAQ Preview"
        className="image-preview"
      />
      <button
        type="button"
        className="remove-image-btn"
        onClick={() => setForm({ ...form, faq_image_url: '' })}
      >
        ❌ Remove
      </button>
    </div>
  )}
</div>



        {/* 📄 GENERAL NOTE */}
        <textarea
          placeholder="General Note / Description"
          value={form.note}
          rows={3}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />

        {/* ✅ SAVE BUTTONS */}
        <div className="form-actions">
          <button 
            type="submit" 
            disabled={loading || uploading}
            className={`primary-btn ${uploading ? "uploading" : ""}`}
          >
            {loading ? "💾 Saving..." : uploading ? "📤 Uploading Images..." : editingId ? "✏️ Update Service" : " Add Service"}
          </button>
          {editingId && (
            <button type="button" className="secondary-btn" onClick={handleCancelEdit}>
              ❌ Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-list">
        <h3> Manage Services ({services.length})</h3>
        {services.length === 0 ? (
          <p>No services found. Add your first service above! 🎉</p>
        ) : (
          services.map((s) => (
            <div key={s.id} className="admin-card">
              <div className="admin-card-content">
                <strong>{s.title}</strong>
                <span className="admin-slug">/{s.slug}</span>
                <p className="admin-status">
                  Status: <span className={s.is_active ? "active" : "inactive"}>
                    {s.is_active ? "✅ Active" : "❌ Hidden"}
                  </span>
                </p>
                {s.image_url && (
                  <img src={s.image_url} alt={s.title} className="service-list-preview" />
                )}
              </div>
              <div className="admin-actions">
                <button onClick={() => handleEditClick(s)} className="edit-btn">
                  Edit
                </button>
                <button
                  onClick={() => toggleStatus(s.id, s.is_active)}
                  className={`status-btn ${s.is_active ? "active" : "inactive"}`}
                >
                  {s.is_active ? " Hide" : "✅ Activate"}
                </button>
                <button onClick={() => deleteService(s.id)} className="delete-btn">
                   Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
