/* ============================================
   AI Resume Builder — Client-Side Logic
   ============================================ */

// ─── Toast Notification System ───────────────────
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> ${message}`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ─── Loading State Helpers ──────────────────────
function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  if (loading) {
    btn.classList.add('loading');
    btn.disabled = true;
  } else {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}

// ─── Education Entry Management ─────────────────
let eduCounter = 1;

function addEducation() {
  eduCounter++;
  const container = document.getElementById('educationEntries');
  const entry = document.createElement('div');
  entry.className = 'edu-entry';
  entry.dataset.entry = eduCounter;
  entry.innerHTML = `
    <div class="edu-entry-header">
      <span class="edu-entry-number">Education #${eduCounter}</span>
      <button class="edu-remove-btn" onclick="removeEducation(this)" type="button">✕ Remove</button>
    </div>
    <div class="edu-row">
      <div class="form-group edu-half">
        <label class="form-label">Degree Type</label>
        <select class="form-input edu-degree">
          <option value="">Select Degree...</option>
          <optgroup label="Undergraduate">
            <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
            <option value="B.E.">B.E. (Bachelor of Engineering)</option>
            <option value="B.Sc">B.Sc (Bachelor of Science)</option>
            <option value="B.Com">B.Com (Bachelor of Commerce)</option>
            <option value="B.A.">B.A. (Bachelor of Arts)</option>
            <option value="BBA">BBA (Bachelor of Business Admin)</option>
            <option value="BCA">BCA (Bachelor of Computer App)</option>
            <option value="B.Pharm">B.Pharm (Bachelor of Pharmacy)</option>
            <option value="MBBS">MBBS</option>
            <option value="BDS">BDS (Bachelor of Dental Surgery)</option>
            <option value="B.Arch">B.Arch (Bachelor of Architecture)</option>
            <option value="LLB">LLB (Bachelor of Law)</option>
            <option value="B.Des">B.Des (Bachelor of Design)</option>
          </optgroup>
          <optgroup label="Postgraduate">
            <option value="M.Tech">M.Tech (Master of Technology)</option>
            <option value="M.E.">M.E. (Master of Engineering)</option>
            <option value="M.Sc">M.Sc (Master of Science)</option>
            <option value="MBA">MBA (Master of Business Admin)</option>
            <option value="MCA">MCA (Master of Computer App)</option>
            <option value="M.Com">M.Com (Master of Commerce)</option>
            <option value="M.A.">M.A. (Master of Arts)</option>
            <option value="M.Pharm">M.Pharm (Master of Pharmacy)</option>
            <option value="MD">MD (Doctor of Medicine)</option>
            <option value="LLM">LLM (Master of Law)</option>
            <option value="M.Des">M.Des (Master of Design)</option>
          </optgroup>
          <optgroup label="Diploma & Others">
            <option value="Diploma">Diploma</option>
            <option value="Polytechnic Diploma">Polytechnic Diploma</option>
            <option value="Ph.D.">Ph.D. (Doctorate)</option>
            <option value="PG Diploma">PG Diploma</option>
            <option value="Certificate">Certificate Course</option>
            <option value="12th (HSC)">12th (HSC / Intermediate)</option>
            <option value="10th (SSC)">10th (SSC / Matriculation)</option>
          </optgroup>
        </select>
      </div>
      <div class="form-group edu-half">
        <label class="form-label">Specialization / Branch</label>
        <input class="form-input edu-specialization" type="text" list="branchList" placeholder="e.g. Computer Science, ECE...">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">College / Institute</label>
      <input class="form-input edu-college" type="text" list="collegeList" placeholder="Search college name..." autocomplete="off">
    </div>
    <div class="edu-row">
      <div class="form-group edu-third">
        <label class="form-label">Start Year</label>
        <input class="form-input edu-start" type="number" min="1990" max="2030" placeholder="2020">
      </div>
      <div class="form-group edu-third">
        <label class="form-label">End Year</label>
        <input class="form-input edu-end" type="number" min="1990" max="2035" placeholder="2024">
      </div>
      <div class="form-group edu-third">
        <label class="form-label">GPA / %</label>
        <input class="form-input edu-gpa" type="text" placeholder="e.g. 8.5 or 85%">
      </div>
    </div>
  `;
  container.appendChild(entry);
  showToast(`Education #${eduCounter} added`, 'info');
}

function removeEducation(btn) {
  const entry = btn.closest('.edu-entry');
  entry.style.animation = 'toastOut 0.3s ease forwards';
  setTimeout(() => {
    entry.remove();
    renumberEducation();
  }, 300);
}

function renumberEducation() {
  const entries = document.querySelectorAll('.edu-entry');
  entries.forEach((entry, i) => {
    entry.querySelector('.edu-entry-number').textContent = `Education #${i + 1}`;
  });
}

// Collect all education entries into a formatted string
function getEducationText() {
  const entries = document.querySelectorAll('.edu-entry');
  const educations = [];

  entries.forEach(entry => {
    const degree = entry.querySelector('.edu-degree')?.value || '';
    const specialization = entry.querySelector('.edu-specialization')?.value?.trim() || '';
    const college = entry.querySelector('.edu-college')?.value?.trim() || '';
    const startYear = entry.querySelector('.edu-start')?.value || '';
    const endYear = entry.querySelector('.edu-end')?.value || '';
    const gpa = entry.querySelector('.edu-gpa')?.value?.trim() || '';

    if (!degree && !college) return; // Skip empty entries

    let line = '';
    if (degree) line += degree;
    if (specialization) line += ` in ${specialization}`;
    if (college) line += `, ${college}`;
    if (startYear || endYear) line += `, ${startYear}–${endYear}`;
    if (gpa) line += `, GPA/Score: ${gpa}`;

    educations.push(line);
  });

  return educations.join('\n');
}

// ─── Markdown to Styled HTML Renderer ───────────
function renderMarkdown(text) {
  if (typeof marked !== 'undefined') {
    // Configure marked for clean output
    marked.setOptions({
      breaks: true,
      gfm: true
    });
    return marked.parse(text);
  }
  // Fallback: basic markdown parsing
  return text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/^(.+)$/gm, '<p>$1</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    .replace(/<p><li>/g, '<li>')
    .replace(/<\/li><\/p>/g, '</li>')
    .replace(/<p><ul>/g, '<ul>')
    .replace(/<\/ul><\/p>/g, '</ul>');
}

// ─── Display resume content in the styled document ──
function displayResume(content, isMarkdown = true) {
  const output = document.getElementById('output');
  const placeholder = document.getElementById('placeholder');

  if (placeholder) placeholder.classList.add('hidden');
  output.classList.remove('plain-text');

  if (isMarkdown) {
    const html = renderMarkdown(content);
    output.innerHTML = `<div class="resume-content">${html}</div>`;
  } else {
    output.classList.add('plain-text');
    output.innerHTML = `<div class="resume-content">${content}</div>`;
  }
}

// ─── Register ───────────────────────────────────
async function register() {
  const name = document.getElementById('name')?.value?.trim();
  const email = document.getElementById('email')?.value?.trim();
  const password = document.getElementById('password')?.value;

  if (!name || !email || !password) {
    showToast('Please fill in all fields', 'error');
    return;
  }

  if (password.length < 6) {
    showToast('Password must be at least 6 characters', 'error');
    return;
  }

  setLoading('registerBtn', true);

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.text();

    if (res.ok) {
      showToast('Account created! Redirecting to login...', 'success');
      setTimeout(() => window.location.href = 'login.html', 1500);
    } else {
      showToast(data || 'Registration failed', 'error');
    }
  } catch (err) {
    showToast('Network error. Please try again.', 'error');
    console.error(err);
  } finally {
    setLoading('registerBtn', false);
  }
}

// ─── Login ──────────────────────────────────────
async function login() {
  const email = document.getElementById('email')?.value?.trim();
  const password = document.getElementById('password')?.value;

  if (!email || !password) {
    showToast('Please enter email and password', 'error');
    return;
  }

  setLoading('loginBtn', true);

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.text();

    if (data === 'Login Success') {
      showToast('Welcome back! Redirecting...', 'success');
      setTimeout(() => window.location.href = 'index.html', 1000);
    } else {
      showToast(data || 'Login failed', 'error');
    }
  } catch (err) {
    showToast('Network error. Please try again.', 'error');
    console.error(err);
  } finally {
    setLoading('loginBtn', false);
  }
}

// ─── Logout ─────────────────────────────────────
function logout() {
  showToast('Signed out successfully', 'info');
  setTimeout(() => window.location.href = 'login.html', 800);
}

// ─── Save Resume ────────────────────────────────
async function saveResume() {
  const name = document.getElementById('name')?.value?.trim();
  const skills = document.getElementById('skills')?.value?.trim();
  const education = document.getElementById('education')?.value?.trim();
  const experience = document.getElementById('experience')?.value?.trim();
  const job = document.getElementById('job')?.value?.trim();

  if (!name) {
    showToast('Please enter your name at minimum', 'error');
    return;
  }

  setLoading('saveBtn', true);

  try {
    const res = await fetch('/api/resume/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, skills, education, experience, job })
    });

    if (res.ok) {
      showToast('Resume saved to database!', 'success');
    } else {
      showToast('Failed to save resume', 'error');
    }
  } catch (err) {
    showToast('Network error. Please try again.', 'error');
    console.error(err);
  } finally {
    setLoading('saveBtn', false);
  }
}

// ─── Quick Generate (Client-side, styled) ───────
function generate() {
  const name = document.getElementById('name')?.value?.trim();
  const skills = document.getElementById('skills')?.value?.trim();
  const education = document.getElementById('education')?.value?.trim();
  const experience = document.getElementById('experience')?.value?.trim();
  const job = document.getElementById('job')?.value?.trim();

  if (!name) {
    showToast('Please enter at least your name', 'error');
    return;
  }

  // Build a markdown-formatted resume
  let md = `# ${name}\n\n`;

  if (job) {
    md += `## Professional Summary\n\n`;
    md += `Results-driven professional seeking the **${job}** role`;
    if (skills) {
      md += ` with strong expertise in ${skills.split(',').slice(0, 3).map(s => s.trim()).join(', ')}`;
    }
    md += `. Committed to delivering impactful results, continuous learning, and collaborative teamwork.\n\n`;
  }

  if (skills) {
    md += `## Skills\n\n`;
    skills.split(',').forEach(skill => {
      const s = skill.trim();
      if (s) md += `- ${s}\n`;
    });
    md += '\n';
  }

  if (experience) {
    md += `## Work Experience\n\n`;
    md += `${experience}\n\n`;
  }

  if (education) {
    md += `## Education\n\n`;
    md += `${education}\n\n`;
  }

  displayResume(md, true);
  showToast('Resume generated!', 'success');
}

// ─── AI Generate ────────────────────────────────
async function generateAI() {
  const name = document.getElementById('name')?.value?.trim();
  const skills = document.getElementById('skills')?.value?.trim();
  const education = document.getElementById('education')?.value?.trim();
  const experience = document.getElementById('experience')?.value?.trim();
  const job = document.getElementById('job')?.value?.trim();

  if (!name) {
    showToast('Please enter at least your name', 'error');
    return;
  }

  setLoading('aiGenerateBtn', true);

  const output = document.getElementById('output');
  const placeholder = document.getElementById('placeholder');

  // Show typing indicator
  if (placeholder) placeholder.classList.add('hidden');
  output.innerHTML = `
    <div class="resume-content" style="display:flex;align-items:center;justify-content:center;min-height:300px;gap:12px;color:#6366f1;font-weight:600;">
      <span>✨ AI is crafting your resume</span>
      <div class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;

  try {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, skills, education, experience, job })
    });

    if (!res.ok) {
      throw new Error('AI generation failed');
    }

    const data = await res.json();
    displayResume(data.result, true);
    showToast('AI resume generated successfully!', 'success');

  } catch (err) {
    output.innerHTML = '';
    if (placeholder) placeholder.classList.remove('hidden');
    showToast('AI generation failed. Check your API key or try again.', 'error');
    console.error(err);
  } finally {
    setLoading('aiGenerateBtn', false);
  }
}

// ─── Download PDF (crisp vector text using jsPDF) ──
async function downloadPDF() {
  try {
    const output = document.getElementById('output');
    const resumeContent = output.querySelector('.resume-content');

    if (!resumeContent || !resumeContent.innerHTML.trim()) {
      showToast('Generate a resume first before downloading', 'error');
      return;
    }

    setLoading('downloadBtn', true);
    showToast('Generating PDF...', 'info');

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const marginLeft = 18;
    const marginRight = 18;
    const maxWidth = pageWidth - marginLeft - marginRight;
    let y = 16;

    // Colors
    const colors = {
      accent: [99, 102, 241],       // #6366f1
      accentDark: [79, 70, 229],    // #4F46E5
      black: [15, 23, 42],          // #0f172a
      dark: [30, 41, 59],           // #1e293b
      body: [51, 65, 85],           // #334155
      muted: [100, 116, 139],       // #64748b
      border: [226, 232, 240],      // #e2e8f0
      blockquoteBg: [245, 243, 255] // #f5f3ff
    };

    // Draw top accent gradient bar
    const barColors = [[99,102,241],[139,92,246],[236,72,153],[6,182,212]];
    const barWidth = maxWidth / 4;
    for (let i = 0; i < 4; i++) {
      doc.setFillColor(...barColors[i]);
      doc.rect(marginLeft + (i * barWidth), y, barWidth + 0.5, 2, 'F');
    }
    y += 8;

    // Helper: check page break
    function checkPage(needed = 12) {
      if (y + needed > pageHeight - 16) {
        doc.addPage();
        y = 16;
      }
    }

    // Helper: draw wrapped text and return new Y
    function drawText(text, x, startY, fontSize, color, fontStyle = 'normal', lineHeight = 1.5) {
      doc.setFont('helvetica', fontStyle);
      doc.setFontSize(fontSize);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, maxWidth - (x - marginLeft));
      for (const line of lines) {
        checkPage(fontSize * 0.4);
        doc.text(line, x, startY);
        startY += fontSize * 0.42 * lineHeight;
      }
      return startY;
    }

    // Parse HTML elements from resume content
    const elements = resumeContent.children;

    for (const el of elements) {
      const tag = el.tagName;
      const text = el.innerText.trim();
      if (!text) continue;

      if (tag === 'H1') {
        // Name — large bold
        checkPage(16);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.setTextColor(...colors.black);
        doc.text(text, marginLeft, y);
        y += 10;

      } else if (tag === 'H2') {
        // Section header
        checkPage(14);
        y += 4;
        // Purple accent bar
        doc.setFillColor(...colors.accent);
        doc.rect(marginLeft, y - 4, 1.5, 6, 'F');
        // Header text
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...colors.accent);
        doc.text(text.toUpperCase(), marginLeft + 5, y);
        y += 3;
        // Underline
        doc.setDrawColor(...colors.border);
        doc.setLineWidth(0.4);
        doc.line(marginLeft, y, pageWidth - marginRight, y);
        y += 5;

      } else if (tag === 'H3') {
        // Job title / degree
        checkPage(10);
        y = drawText(text, marginLeft, y, 12, colors.dark, 'bold');
        y += 1;

      } else if (tag === 'H4') {
        // Company / university
        checkPage(8);
        y = drawText(text, marginLeft, y, 10, colors.muted, 'bolditalic');
        y += 1;

      } else if (tag === 'BLOCKQUOTE') {
        // Professional summary blockquote
        checkPage(20);
        const bqText = el.innerText.trim();
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const bqLines = doc.splitTextToSize(bqText, maxWidth - 10);
        const bqHeight = bqLines.length * 5 + 6;

        // Background
        doc.setFillColor(...colors.blockquoteBg);
        doc.roundedRect(marginLeft, y - 4, maxWidth, bqHeight, 1, 1, 'F');
        // Left accent bar
        doc.setFillColor(...colors.accent);
        doc.rect(marginLeft, y - 4, 1.5, bqHeight, 'F');

        doc.setTextColor(...colors.body);
        for (const line of bqLines) {
          checkPage(6);
          doc.text(line, marginLeft + 5, y);
          y += 5;
        }
        y += 4;

      } else if (tag === 'UL') {
        // Bullet list
        const items = el.querySelectorAll(':scope > li');
        for (const li of items) {
          checkPage(10);
          const liText = li.innerText.trim();
          
          // Purple bullet
          doc.setFillColor(...colors.accent);
          doc.circle(marginLeft + 2, y - 1.2, 1, 'F');
          
          // Text
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(...colors.body);
          const liLines = doc.splitTextToSize(liText, maxWidth - 10);
          for (const line of liLines) {
            checkPage(5);
            doc.text(line, marginLeft + 6, y);
            y += 4.5;
          }
          y += 1.5;
        }
        y += 1;

      } else if (tag === 'OL') {
        const items = el.querySelectorAll(':scope > li');
        let num = 1;
        for (const li of items) {
          checkPage(10);
          const liText = li.innerText.trim();
          
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(...colors.accent);
          doc.text(`${num}.`, marginLeft + 1, y);
          
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(...colors.body);
          const liLines = doc.splitTextToSize(liText, maxWidth - 10);
          for (const line of liLines) {
            checkPage(5);
            doc.text(line, marginLeft + 6, y);
            y += 4.5;
          }
          y += 1.5;
          num++;
        }
        y += 1;

      } else if (tag === 'HR') {
        checkPage(6);
        doc.setDrawColor(...colors.border);
        doc.setLineWidth(0.3);
        doc.line(marginLeft + 20, y, pageWidth - marginRight - 20, y);
        y += 4;

      } else if (tag === 'P') {
        // Regular paragraph — handle bold/italic inline
        checkPage(8);
        y = drawText(text, marginLeft, y, 10, colors.body, 'normal');
        y += 2;

      } else {
        // Any other element — render as text
        checkPage(8);
        y = drawText(text, marginLeft, y, 10, colors.body, 'normal');
        y += 2;
      }
    }

    const nameField = document.getElementById('name')?.value?.trim() || 'resume';
    const filename = `${nameField.replace(/\s+/g, '_')}_resume.pdf`;
    doc.save(filename);

    showToast('PDF downloaded!', 'success');

  } catch (error) {
    console.error(error);
    showToast('PDF generation failed', 'error');
  } finally {
    setLoading('downloadBtn', false);
  }
}

// ─── Keyboard Support ───────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    const active = document.activeElement;
    if (active && active.tagName === 'INPUT') {
      if (document.getElementById('loginBtn')) {
        e.preventDefault();
        login();
      } else if (document.getElementById('registerBtn')) {
        e.preventDefault();
        register();
      }
    }
  }
});