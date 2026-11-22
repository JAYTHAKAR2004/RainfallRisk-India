"""
RainfallRisk India - Academic Presentation Generator
Generates a 41-slide presentation in PowerPoint (.pptx)
with widescreen 16:9 format, native editable elements, embedded GIFs,
and comprehensive speaker notes on every slide.
"""

import os
import sys
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

# Add current directory to path
sys.path.insert(0, os.path.dirname(__file__))
from academic_presentation_data import SLIDES_DATA

OUTPUT_DIR = "RainfallRisk_Academic_Presentation"
os.makedirs(OUTPUT_DIR, exist_ok=True)
PPTX_PATH = os.path.join(OUTPUT_DIR, "RainfallRisk_India_Research_Presentation.pptx")

# 16:9 Widescreen Presentation Setup
prs = pptx.Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank_layout = prs.slide_layouts[6]

# Theme Colors (Refined Academic Research Palette)
COLOR_BG = RGBColor(11, 25, 44)           # #0B192C Deep Academic Navy
COLOR_CARD_BG = RGBColor(20, 42, 68)      # #142A44 Muted Slate-Navy
COLOR_CARD_ALT = RGBColor(28, 56, 88)     # Accent Card Fill
COLOR_BORDER = RGBColor(51, 75, 104)      # #334B68 Subtle Slate Border
COLOR_TEXT_TITLE = RGBColor(248, 250, 252) # #F8FAFC Pure Crisp White
COLOR_TEXT_BODY = RGBColor(226, 232, 240)  # #E2E8F0 Mist White
COLOR_TEXT_MUTED = RGBColor(148, 163, 184) # #94A3B8 Rain Blue / Slate Muted
COLOR_TEAL = RGBColor(45, 212, 191)       # #2DD4BF Academic Teal
COLOR_AMBER = RGBColor(251, 191, 36)      # #FBBF24 Warm Amber
COLOR_CORAL = RGBColor(248, 113, 113)     # #F87171 Refined Coral

def set_slide_background(slide, color=COLOR_BG):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = color
    bg.line.fill.background()
    return bg

def add_header(slide, category, title, subtitle=None):
    # Category pill
    pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.35), Inches(3.2), Inches(0.32))
    pill.fill.solid()
    pill.fill.fore_color.rgb = COLOR_CARD_ALT
    pill.line.color.rgb = COLOR_TEAL
    pill.line.width = Pt(1)
    tf_pill = pill.text_frame
    tf_pill.word_wrap = True
    p_pill = tf_pill.paragraphs[0]
    p_pill.text = category.upper()
    p_pill.font.size = Pt(9)
    p_pill.font.bold = True
    p_pill.font.color.rgb = COLOR_TEAL
    p_pill.alignment = PP_ALIGN.CENTER

    # Title box
    tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.72), Inches(11.733), Inches(0.85))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = COLOR_TEXT_TITLE
    p.font.name = "Georgia"

    if subtitle:
        p2 = tf.add_paragraph()
        p2.text = subtitle
        p2.font.size = Pt(11)
        p2.font.color.rgb = COLOR_TEXT_MUTED
        p2.font.name = "Calibri"

    # Divider rule
    rule = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.60), Inches(11.733), Inches(0.015))
    rule.fill.solid()
    rule.fill.fore_color.rgb = COLOR_BORDER
    rule.line.fill.background()

def add_footer(slide, slide_num, total_slides=41):
    tb = slide.shapes.add_textbox(Inches(0.8), Inches(7.12), Inches(11.733), Inches(0.28))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.text = f"RainfallRisk India: Statistical Rainfall Research Monograph (2000–2025 & 2026) | Slide {slide_num} of {total_slides} | https://rainfallriskindia.vercel.app"
    p.font.size = Pt(8.5)
    p.font.color.rgb = COLOR_TEXT_MUTED
    p.font.name = "Calibri"

def add_card(slide, left, top, width, height, title=None, border_color=COLOR_BORDER, fill_color=COLOR_CARD_BG):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    card.fill.solid()
    card.fill.fore_color.rgb = fill_color
    card.line.color.rgb = border_color
    card.line.width = Pt(1.2)

    if title:
        tb = slide.shapes.add_textbox(left + Inches(0.18), top + Inches(0.14), width - Inches(0.36), Inches(0.32))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = COLOR_TEXT_TITLE
        p.font.name = "Georgia"
    return card

def add_bullets_to_card(slide, left, top, width, height, bullets, title=None, border_color=COLOR_BORDER, fill_color=COLOR_CARD_BG, font_size=10):
    add_card(slide, left, top, width, height, title=title, border_color=border_color, fill_color=fill_color)
    content_top = top + Inches(0.48) if title else top + Inches(0.18)
    content_height = height - (Inches(0.58) if title else Inches(0.32))
    
    tb = slide.shapes.add_textbox(left + Inches(0.2), content_top, width - Inches(0.4), content_height)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

    for i, pt in enumerate(bullets):
        p = tf.paragraphs[0] if i == 0 and len(tf.paragraphs[0].text) == 0 else tf.add_paragraph()
        p.text = f"•  {pt}"
        p.font.size = Pt(font_size)
        p.font.color.rgb = COLOR_TEXT_BODY
        p.font.name = "Calibri"
        p.space_after = Pt(4)

def add_stat_badge(slide, left, top, width, height, value_text, label_text, border_color=COLOR_TEAL):
    badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    badge.fill.solid()
    badge.fill.fore_color.rgb = COLOR_CARD_ALT
    badge.line.color.rgb = border_color
    badge.line.width = Pt(1.2)
    
    tf = badge.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = value_text
    p1.font.size = Pt(16)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_TEXT_TITLE
    p1.alignment = PP_ALIGN.CENTER
    
    p2 = tf.add_paragraph()
    p2.text = label_text
    p2.font.size = Pt(9)
    p2.font.color.rgb = border_color
    p2.alignment = PP_ALIGN.CENTER

def build_slide(slide_meta):
    s_num = slide_meta["slide_num"]
    s_type = slide_meta["type"]
    slide = prs.slides.add_slide(blank_layout)
    set_slide_background(slide)
    
    # Speaker notes
    if "notes" in slide_meta:
        slide.notes_slide.notes_text_frame.text = slide_meta["notes"]

    # 1. COVER SLIDE
    if s_type == "cover":
        rect = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.0), Inches(11.733), Inches(5.5))
        rect.fill.solid()
        rect.fill.fore_color.rgb = COLOR_CARD_BG
        rect.line.color.rgb = COLOR_TEAL
        rect.line.width = Pt(1.5)

        tb = slide.shapes.add_textbox(Inches(1.2), Inches(1.3), Inches(10.9), Inches(2.2))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p_pill = tf.paragraphs[0]
        p_pill.text = slide_meta["category"].upper()
        p_pill.font.size = Pt(11)
        p_pill.font.bold = True
        p_pill.font.color.rgb = COLOR_TEAL
        p_pill.space_after = Pt(10)

        p_title = tf.add_paragraph()
        p_title.text = slide_meta["title"]
        p_title.font.size = Pt(36)
        p_title.font.bold = True
        p_title.font.color.rgb = COLOR_TEXT_TITLE
        p_title.font.name = "Georgia"
        p_title.space_after = Pt(8)

        p_sub = tf.add_paragraph()
        p_sub.text = slide_meta["subtitle"]
        p_sub.font.size = Pt(14)
        p_sub.font.color.rgb = COLOR_TEXT_MUTED
        p_sub.font.name = "Calibri"

        meta_card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.2), Inches(3.9), Inches(10.933), Inches(2.3))
        meta_card.fill.solid()
        meta_card.fill.fore_color.rgb = COLOR_CARD_ALT
        meta_card.line.color.rgb = COLOR_BORDER
        meta_card.line.width = Pt(1)

        tb_meta = slide.shapes.add_textbox(Inches(1.5), Inches(4.05), Inches(10.3), Inches(2.0))
        tf_m = tb_meta.text_frame
        tf_m.word_wrap = True

        p_m1 = tf_m.paragraphs[0]
        p_m1.text = f"Principal Researcher: {slide_meta['author']} | Degree: Master of Technology (Data Science)"
        p_m1.font.size = Pt(12)
        p_m1.font.bold = True
        p_m1.font.color.rgb = COLOR_TEXT_BODY

        p_m2 = tf_m.add_paragraph()
        p_m2.text = f"Academic Unit: {slide_meta['institution']} | Guide: {slide_meta['guide']}"
        p_m2.font.size = Pt(11)
        p_m2.font.color.rgb = COLOR_TEXT_MUTED

        p_m3 = tf_m.add_paragraph()
        p_m3.text = f"Live Research Platform: {slide_meta['website']}"
        p_m3.font.size = Pt(11)
        p_m3.font.bold = True
        p_m3.font.color.rgb = COLOR_TEAL
        p_m3.space_before = Pt(6)

        p_m4 = tf_m.add_paragraph()
        p_m4.text = f"GitHub Code Repository: {slide_meta['repo']}"
        p_m4.font.size = Pt(11)
        p_m4.font.bold = True
        p_m4.font.color.rgb = COLOR_AMBER
        p_m4.space_before = Pt(4)

        p_m5 = tf_m.add_paragraph()
        p_m5.text = "Climatological Epoch: 2000–2025 (IMD 0.25° Gridded NetCDF) & 2026 (727-District Balanced Observational Panel)"
        p_m5.font.size = Pt(9.5)
        p_m5.font.color.rgb = COLOR_TEXT_MUTED
        p_m5.space_before = Pt(4)

        add_footer(slide, s_num)
        return

    # Standard Header & Footer for all subsequent slides
    add_header(slide, slide_meta["category"], slide_meta["title"], slide_meta.get("subtitle"))
    add_footer(slide, s_num)

    # 2. SPLIT CARDS (3 horizontal cards or 4 grid cards)
    if s_type == "split_cards":
        cards = slide_meta["cards"]
        n_cards = len(cards)
        if n_cards == 3:
            card_w = Inches(3.75)
            spacing = Inches(0.24)
            left_base = Inches(0.8)
            card_h = Inches(5.1)
            top_base = Inches(1.8)

            for i, c in enumerate(cards):
                c_left = left_base + i * (card_w + spacing)
                add_bullets_to_card(slide, c_left, top_base, card_w, card_h, c["bullets"], title=c["title"], font_size=10.5)
        elif n_cards == 4:
            card_w = Inches(5.7)
            card_h = Inches(2.45)
            spacing_x = Inches(0.33)
            spacing_y = Inches(0.2)
            for i, c in enumerate(cards):
                col = i % 2
                row = i // 2
                c_left = Inches(0.8) + col * (card_w + spacing_x)
                c_top = Inches(1.8) + row * (card_h + spacing_y)
                add_bullets_to_card(slide, c_left, c_top, card_w, card_h, c["bullets"], title=c["title"], font_size=10)

    # 3. DUAL PANEL (Study 1 vs Study 2)
    elif s_type == "dual_panel":
        p_left = slide_meta["panel_left"]
        p_right = slide_meta["panel_right"]
        panel_w = Inches(5.7)
        panel_h = Inches(5.1)
        
        add_bullets_to_card(slide, Inches(0.8), Inches(1.8), panel_w, panel_h, p_left["bullets"], title=p_left["title"], border_color=COLOR_TEAL, font_size=10)
        add_bullets_to_card(slide, Inches(6.833), Inches(1.8), panel_w, panel_h, p_right["bullets"], title=p_right["title"], border_color=COLOR_AMBER, font_size=10)

    # 4. WORKFLOW SLIDE
    elif s_type == "workflow":
        steps = slide_meta["workflow_steps"]
        step_h = Inches(0.64)
        step_spacing = Inches(0.09)
        top_base = Inches(1.78)
        
        for i, st in enumerate(steps):
            s_top = top_base + i * (step_h + step_spacing)
            badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), s_top, Inches(2.8), step_h)
            badge.fill.solid()
            badge.fill.fore_color.rgb = COLOR_CARD_ALT
            badge.line.color.rgb = COLOR_TEAL
            badge.line.width = Pt(1)
            tf_b = badge.text_frame
            tf_b.word_wrap = True
            p_b = tf_b.paragraphs[0]
            p_b.text = st["step"]
            p_b.font.size = Pt(11)
            p_b.font.bold = True
            p_b.font.color.rgb = COLOR_TEXT_TITLE
            p_b.alignment = PP_ALIGN.CENTER
            
            desc_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(3.7), s_top, Inches(8.833), step_h)
            desc_box.fill.solid()
            desc_box.fill.fore_color.rgb = COLOR_CARD_BG
            desc_box.line.color.rgb = COLOR_BORDER
            desc_box.line.width = Pt(1)
            tf_d = desc_box.text_frame
            tf_d.word_wrap = True
            p_d = tf_d.paragraphs[0]
            p_d.text = st["desc"]
            p_d.font.size = Pt(10.5)
            p_d.font.color.rgb = COLOR_TEXT_BODY

    # 5. IMAGE RIGHT
    elif s_type == "image_right":
        card_w = Inches(5.6)
        card_h = Inches(4.0)
        add_bullets_to_card(slide, Inches(0.8), Inches(1.8), card_w, card_h, slide_meta["bullets"], title="Empirical Analysis & Statistical Rigor", font_size=10.5)
        
        if "stat_badge" in slide_meta:
            sb = slide_meta["stat_badge"]
            add_stat_badge(slide, Inches(0.8), Inches(5.95), card_w, Inches(0.95), sb["val"], sb["label"])

        img_card = add_card(slide, Inches(6.6), Inches(1.8), Inches(5.933), Inches(5.1), fill_color=COLOR_BG)
        img_path = slide_meta["image_path"]
        if os.path.exists(img_path):
            slide.shapes.add_picture(img_path, Inches(6.75), Inches(1.95), width=Inches(5.633))
        
        if "image_caption" in slide_meta:
            tb_c = slide.shapes.add_textbox(Inches(6.7), Inches(6.45), Inches(5.7), Inches(0.35))
            tf_c = tb_c.text_frame
            tf_c.word_wrap = True
            p_c = tf_c.paragraphs[0]
            p_c.text = slide_meta["image_caption"]
            p_c.font.size = Pt(9)
            p_c.font.color.rgb = COLOR_TEXT_MUTED
            p_c.alignment = PP_ALIGN.CENTER

    # 6. GIF LEFT
    elif s_type == "gif_left":
        add_card(slide, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.1), fill_color=COLOR_BG)
        gif_path = slide_meta["image_path"]
        if os.path.exists(gif_path):
            slide.shapes.add_picture(gif_path, Inches(0.95), Inches(1.95), width=Inches(5.3))
        
        if "image_caption" in slide_meta:
            tb_c = slide.shapes.add_textbox(Inches(0.9), Inches(6.45), Inches(5.4), Inches(0.35))
            tf_c = tb_c.text_frame
            tf_c.word_wrap = True
            p_c = tf_c.paragraphs[0]
            p_c.text = slide_meta["image_caption"]
            p_c.font.size = Pt(9)
            p_c.font.color.rgb = COLOR_TEXT_MUTED
            p_c.alignment = PP_ALIGN.CENTER

        card_w = Inches(5.933)
        card_h = Inches(4.0)
        add_bullets_to_card(slide, Inches(6.6), Inches(1.8), card_w, card_h, slide_meta["bullets"], title="Climatological Findings & Extremes Dynamics", font_size=10.5)

        if "stat_badge" in slide_meta:
            sb = slide_meta["stat_badge"]
            add_stat_badge(slide, Inches(6.6), Inches(5.95), card_w, Inches(0.95), sb["val"], sb["label"])

    # 7. DUAL IMAGE
    elif s_type == "dual_image":
        img_w = Inches(5.7)
        img_h = Inches(3.0)
        
        add_card(slide, Inches(0.8), Inches(1.75), img_w, img_h, fill_color=COLOR_BG)
        if os.path.exists(slide_meta["image_left"]):
            slide.shapes.add_picture(slide_meta["image_left"], Inches(0.9), Inches(1.82), width=Inches(5.5))
        
        tb_cl = slide.shapes.add_textbox(Inches(0.9), Inches(4.45), Inches(5.5), Inches(0.28))
        tf_cl = tb_cl.text_frame
        tf_cl.word_wrap = True
        p_cl = tf_cl.paragraphs[0]
        p_cl.text = slide_meta.get("caption_left", "")
        p_cl.font.size = Pt(8.5)
        p_cl.font.color.rgb = COLOR_TEXT_MUTED
        p_cl.alignment = PP_ALIGN.CENTER

        add_card(slide, Inches(6.833), Inches(1.75), img_w, img_h, fill_color=COLOR_BG)
        if os.path.exists(slide_meta["image_right"]):
            slide.shapes.add_picture(slide_meta["image_right"], Inches(6.933), Inches(1.82), width=Inches(5.5))

        tb_cr = slide.shapes.add_textbox(Inches(6.933), Inches(4.45), Inches(5.5), Inches(0.28))
        tf_cr = tb_cr.text_frame
        tf_cr.word_wrap = True
        p_cr = tf_cr.paragraphs[0]
        p_cr.text = slide_meta.get("caption_right", "")
        p_cr.font.size = Pt(8.5)
        p_cr.font.color.rgb = COLOR_TEXT_MUTED
        p_cr.alignment = PP_ALIGN.CENTER

        add_bullets_to_card(slide, Inches(0.8), Inches(4.85), Inches(11.733), Inches(2.1), slide_meta["bullets"], title="Analytical Synthesis & Statistical Inferences", font_size=10)

    # 8. TABLE SLIDE
    elif s_type == "table":
        headers = slide_meta["headers"]
        rows = slide_meta["rows"]
        n_rows = len(rows) + 1
        n_cols = len(headers)
        
        table_shape = slide.shapes.add_table(n_rows, n_cols, Inches(0.8), Inches(1.8), Inches(11.733), Inches(4.9))
        table = table_shape.table

        for col_idx, h in enumerate(headers):
            cell = table.cell(0, col_idx)
            cell.text = h
            cell.fill.solid()
            cell.fill.fore_color.rgb = COLOR_CARD_ALT
            p = cell.text_frame.paragraphs[0]
            p.font.size = Pt(11)
            p.font.bold = True
            p.font.color.rgb = COLOR_TEAL

        for row_idx, r in enumerate(rows):
            fill_color = COLOR_CARD_BG if row_idx % 2 == 0 else RGBColor(16, 36, 60)
            for col_idx, val in enumerate(r):
                cell = table.cell(row_idx + 1, col_idx)
                cell.text = val
                cell.fill.solid()
                cell.fill.fore_color.rgb = fill_color
                p = cell.text_frame.paragraphs[0]
                p.font.size = Pt(10)
                p.font.color.rgb = COLOR_TEXT_BODY

    # 9. TABLE CARDS
    elif s_type == "table_cards":
        t_headers = slide_meta["table_headers"]
        t_rows = slide_meta["table_rows"]
        n_rows = len(t_rows) + 1
        n_cols = len(t_headers)

        table_shape = slide.shapes.add_table(n_rows, n_cols, Inches(0.8), Inches(1.8), Inches(11.733), Inches(1.5))
        table = table_shape.table

        for col_idx, h in enumerate(t_headers):
            cell = table.cell(0, col_idx)
            cell.text = h
            cell.fill.solid()
            cell.fill.fore_color.rgb = COLOR_CARD_ALT
            p = cell.text_frame.paragraphs[0]
            p.font.size = Pt(10)
            p.font.bold = True
            p.font.color.rgb = COLOR_TEAL

        for row_idx, r in enumerate(t_rows):
            for col_idx, val in enumerate(r):
                cell = table.cell(row_idx + 1, col_idx)
                cell.text = val
                cell.fill.solid()
                cell.fill.fore_color.rgb = COLOR_CARD_BG
                p = cell.text_frame.paragraphs[0]
                p.font.size = Pt(9.5)
                p.font.color.rgb = COLOR_TEXT_BODY

        cards = slide_meta["cards"]
        card_w = Inches(5.7)
        card_h = Inches(3.3)
        add_bullets_to_card(slide, Inches(0.8), Inches(3.5), card_w, card_h, cards[0]["bullets"], title=cards[0]["title"], font_size=10)
        add_bullets_to_card(slide, Inches(6.833), Inches(3.5), card_w, card_h, cards[1]["bullets"], title=cards[1]["title"], font_size=10)

    # 10. FORMULA CARD
    elif s_type == "formula_card":
        f_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.733), Inches(0.85))
        f_box.fill.solid()
        f_box.fill.fore_color.rgb = COLOR_CARD_ALT
        f_box.line.color.rgb = COLOR_CORAL
        f_box.line.width = Pt(1.5)
        tf_f = f_box.text_frame
        tf_f.word_wrap = True
        p_f1 = tf_f.paragraphs[0]
        p_f1.text = "OFFICIAL OPERATIONAL METRIC FORMULATION:"
        p_f1.font.size = Pt(9.5)
        p_f1.font.bold = True
        p_f1.font.color.rgb = COLOR_CORAL
        
        p_f2 = tf_f.add_paragraph()
        p_f2.text = slide_meta["formula"]
        p_f2.font.size = Pt(13)
        p_f2.font.bold = True
        p_f2.font.color.rgb = COLOR_TEXT_TITLE

        cards = slide_meta["cards"]
        card_w = Inches(3.75)
        spacing = Inches(0.24)
        top_base = Inches(2.8)
        card_h = Inches(4.1)

        for i, c in enumerate(cards):
            c_left = Inches(0.8) + i * (card_w + spacing)
            add_bullets_to_card(slide, c_left, top_base, card_w, card_h, c["bullets"], title=c["title"], font_size=10)

    # 11. CLOSING SLIDE
    elif s_type == "closing":
        rect = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.0), Inches(11.733), Inches(5.5))
        rect.fill.solid()
        rect.fill.fore_color.rgb = COLOR_CARD_BG
        rect.line.color.rgb = COLOR_TEAL
        rect.line.width = Pt(1.5)

        tb = slide.shapes.add_textbox(Inches(1.2), Inches(1.3), Inches(10.9), Inches(1.6))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p_pill = tf.paragraphs[0]
        p_pill.text = slide_meta["category"].upper()
        p_pill.font.size = Pt(11)
        p_pill.font.bold = True
        p_pill.font.color.rgb = COLOR_TEAL
        p_pill.space_after = Pt(8)

        p_title = tf.add_paragraph()
        p_title.text = slide_meta["title"]
        p_title.font.size = Pt(32)
        p_title.font.bold = True
        p_title.font.color.rgb = COLOR_TEXT_TITLE
        p_title.font.name = "Georgia"

        c_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.2), Inches(3.1), Inches(10.933), Inches(3.0))
        c_box.fill.solid()
        c_box.fill.fore_color.rgb = COLOR_CARD_ALT
        c_box.line.color.rgb = COLOR_BORDER
        c_box.line.width = Pt(1)

        tb_c = slide.shapes.add_textbox(Inches(1.5), Inches(3.3), Inches(10.3), Inches(2.6))
        tf_c = tb_c.text_frame
        tf_c.word_wrap = True

        p1 = tf_c.paragraphs[0]
        p1.text = f"Principal Researcher: {slide_meta['author']} | Degree: Master of Technology in Data Science"
        p1.font.size = Pt(13)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_BODY

        p2 = tf_c.add_paragraph()
        p2.text = f"Academic Unit: {slide_meta['institution']}"
        p2.font.size = Pt(11.5)
        p2.font.color.rgb = COLOR_TEXT_MUTED
        p2.space_before = Pt(4)

        p3 = tf_c.add_paragraph()
        p3.text = f"Live Interactive Research Platform: {slide_meta['website']}"
        p3.font.size = Pt(12)
        p3.font.bold = True
        p3.font.color.rgb = COLOR_TEAL
        p3.space_before = Pt(12)

        p4 = tf_c.add_paragraph()
        p4.text = f"Open-Source GitHub Repository: {slide_meta['repo']}"
        p4.font.size = Pt(12)
        p4.font.bold = True
        p4.font.color.rgb = COLOR_AMBER
        p4.space_before = Pt(6)

        p5 = tf_c.add_paragraph()
        p5.text = "Data Acknowledgments: India Meteorological Department (IMD) Gridded Archive & National Portal."
        p5.font.size = Pt(10)
        p5.font.color.rgb = COLOR_TEXT_MUTED
        p5.space_before = Pt(12)

def main():
    print(f"Building Academic Presentation with {len(SLIDES_DATA)} slides...")
    for idx, slide_meta in enumerate(SLIDES_DATA):
        print(f"  Generating Slide {slide_meta['slide_num']}/{len(SLIDES_DATA)}: {slide_meta['title'][:45]}...")
        build_slide(slide_meta)

    print(f"Saving presentation to: {PPTX_PATH}")
    prs.save(PPTX_PATH)
    file_size_mb = os.path.getsize(PPTX_PATH) / (1024 * 1024)
    print(f"Successfully generated PowerPoint! Size: {file_size_mb:.2f} MB")

if __name__ == "__main__":
    main()
