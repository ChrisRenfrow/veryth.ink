---
title: "N things I wish someone told me about 3d-printing"
description: "I've made a lot of mistakes as I learn about 3d-printing, and I'm bound to make more! Learn from me so you don't have to do it the hard way."
published_on: 2024-06-07
draft: true
---

There's a lot that can and will go wrong when 3d-printing. It can be devastating when a multi-hour print fails and all you're left with is a functionally useless hunk of material. I'm writing this to hopefully help others avoid some of my mistakes and save hours of troubleshooting anomalies and misprints.

**Disclaimer:** I am no expert. I only started "seriously" printing about a month before publishing this. I am only experienced with printing PLA on a lightly-modded Creality Ender 3 Pro (2016). I've begun tracking my printer usage only a month ago, but at the time of writing I've printed for 82h and used 350m of filament.


# 1. Issues with quality? Try slowing down first

You may be excited to have flashed your printer's mainboard with Klipper and are now capable of printing at *ludicrous speeds*. But I am here to tell you that there is a trade-off. Barring specialized and finely tuned equipment you simply cannot achieve both speed and quality - compromise must be made somewhere. With time and patience you may find a happy middle ground between the two, sometimes slowing down as little as 10mm/s on a particular feature is all that you'll need! More than likely you will need to assess the needs of the item you're printing and optimize only for that. Does it need to be pretty? Does it need to be highly precise? Be honest!

# 2. It might be your wiring

If you've been adding upgrades to your printer, always consider whether the problems you're encountering could be a wiring issue. The two common problems that can emerge are [EMI (electromagnetic interference)](https://en.wikipedia.org/wiki/Electromagnetic_interference) or simply faulty connections. EMI usually emerges as a problem with sensors in the form of erratic Z-axis readings, faulty connections might only emerge when jostling your printer or as the head moves on the X-axis. EMI can be mitigated using wire shielding/insulation like that found in ethernet cables, or using [ferrite core noise suppressors](https://en.wikipedia.org/wiki/Ferrite_bead) or "ferrite beads". Faulty wiring simply requires isolating the behavior and identifying the wires that need to be checked using your trusty multimeter set to continuity mode. This might be a pain, but worth it if you can identify the problem!

# 3. Inductive probe readings drift with changes in temperature!

So you didn't read the fine print on the specification sheet for an inductive sensor you ordered, it happens. After you've installed your inductive probe and have done some preliminary tests, you might notice something odd. The readings you get before heating the bed and after are different! This is because some (maybe all) inductive probes are sensitive to heat. If not addressed you'll likely encounter inconsistent performance when printing your first layer. A way to address this is to always make sure any readings (e.g. homing, bed meshing) are carried out with the bed either fully cooled at room temperature, or heated at your standard printing temperature. You may find it best to heat rather than cool, as heating can be more consistent and faster than cooling.

# 4. Try Klipper!

You may already be driving your printer using OctoPrinter on a Raspberry Pi connected to the serial port of your printer's mainboard, if that's the case then you are one step away from getting started with [Klipper](https://www.klipper3d.org/Overview.html)! What is Klipper? It's a 3d-printing firmware coupled with a print server running on another coupled computer, such as a Raspberry Pi. It's capable of very accurate steps at very high velocities. Why make the switch? Well, since you seem to value customization and control, Klipper provides you with near limitless control over how your printer runs. You may feel like it's all a little over your head, but if you stay calm and read the manual, you'll have a blast! Oh, and if you don't have any must-have OctoPrint plugins, just install [MainsailOS](https://docs-os.mainsail.xyz/) on your RPi and prepare yourself to be awed by its slick and intuitive UI.

# 5. Try different build surfaces

You might have used a couple of different print surfaces, but haven't been too happy with the experience of any so far. Glass

# 6. Yes, you should install the magnetic layer that comes with your steel spring PEI-coated bed

That magnetic material isn't just a nice spare for your printer which already has one installed. No, you'll discover quickly that, when heated, the steel spring will live up to its name and begin to lift on the edges. You might think that you'll just need to clamp it, but this is a mistake. Just peel off the old one magnetic material and install the new one, you'll find that it will provide a sufficiently strong magnetic field to keep the mat unsprung!

# 7. When in doubt, tighten bolts and belts

# 8. Optimize your filament feeding

- Don't make your e-stepper work too hard
- Check for blockages in your bowden tube
- Do it again

# 9. No, it's not normal to encounter resistance getting filament to enter a bowden tube

You might occasionally find it difficult to insert filament into the bowden tube past the threaded compression fitting closest to the E-axis stepper motor, **this is not normal**. You might occasionally encounter what seems like clogging symptoms, but when you perform a cold-pull on the nozzle, there's nothing there. This is a huge red flag that something is wrong with your filament feeding setup, and when coupled with the above is a sure indicator that something is obstructing the filament in the tube! You will want to remove the compression fitting from the tube and inspect the opening to be sure no **leftover tube trimmings from the manufacturer** are present, or you know, some other thing. Checking this first will save you from many headaches.

# 10. "Ironing" has nothing to do with a clothes iron

I know, it sounds plausible to get smoother top layers by carefully placing your print on a clothes iron for just a moment. But actually [ironing](https://help.prusa3d.com/article/ironing_177488) refers to a technique that some slicers can add to instruct the printer to slowly "polish" the top layer while extruding just a tiny bit of filament. The results are magnificent, though costly in terms of time. You should absolutely try it sooner rather than later.
