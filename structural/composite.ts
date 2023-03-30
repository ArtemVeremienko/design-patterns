/**
 * @description
 * Composite is a structural design pattern that lets you compose objects into tree structures
 * and then work with these structures as if they were individual objects.
 */

interface Graphic {
  move(x: number, y: number): void
  draw(): void
}

class Dot implements Graphic {
  constructor(public x: number, public y: number) {}

  move(x: number, y: number) {
    this.x += x
    this.y += y
  }

  draw() {
    console.log('Dot drawing')
  }
}

class Circle extends Dot {
  constructor(public x: number, public y: number, public radius: number) {
    super(x, y)
  }

  draw() {
    console.log('Circle drawing')
  }
}

class CompoundGraphic implements Graphic {
  private children: Graphic[] = []

  add(child: Graphic) {
    this.children.push(child)
  }

  remove(child: Graphic) {
    this.children = this.children.filter((c) => c !== child)
  }

  move(x: number, y: number): void {
    for (const child of this.children) {
      child.move(x, y)
    }
  }

  draw(): void {
    for (const child of this.children) {
      console.log('DRAW - ', child)
      child.draw()
    }
  }
}

class ImageEditor {
  private all!: CompoundGraphic

  load() {
    this.all = new CompoundGraphic()
    this.all.add(new Dot(1, 2))
    this.all.add(new Circle(5, 3, 10))
  }

  groupSelected(components: Graphic[]) {
    const group = new CompoundGraphic()
    for (const component of components) {
      group.add(component)
      this.all.remove(component)
    }
    this.all.add(group)
    this.all.draw()
  }
}

const imageEditor = new ImageEditor()
imageEditor.load()
imageEditor.groupSelected([new Dot(1, 3)])
